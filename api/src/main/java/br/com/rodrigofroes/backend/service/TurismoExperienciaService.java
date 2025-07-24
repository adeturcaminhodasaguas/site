package br.com.rodrigofroes.backend.service;

import java.io.IOException;
import java.util.Date;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.rodrigofroes.backend.DTO.request.TurismoExperienciaRequest;
import br.com.rodrigofroes.backend.DTO.response.MensagemResponse;
import br.com.rodrigofroes.backend.DTO.response.TurismoExperienciaResponse;
import br.com.rodrigofroes.backend.configuration.exception.MunicipioHandlerNotFoundException;
import br.com.rodrigofroes.backend.domain.MunicipioDomain;
import br.com.rodrigofroes.backend.domain.TurismoExperienciaDomain;
import br.com.rodrigofroes.backend.mapper.MensagemMapper;
import br.com.rodrigofroes.backend.mapper.TurismoExperienciaMapper;
import br.com.rodrigofroes.backend.repository.MunicipioRepository;
import br.com.rodrigofroes.backend.repository.TurismoExperienciaRepository;
import br.com.rodrigofroes.backend.util.ContentTypeUtil;
import br.com.rodrigofroes.backend.util.GerarNomeUtil;

@Service
public class TurismoExperienciaService {

    private Logger logger = LoggerFactory.getLogger(TurismoExperienciaService.class);

    @Autowired
    private TurismoExperienciaRepository turismoExperienciaRepository;

    @Autowired
    private MunicipioRepository municipioRepository;

    @Autowired
    private StorageService storageService;

    @Value("${spring.minio.bucket}")
    private String bucketName;

    public MensagemResponse atualizarStatus(UUID id) {
        TurismoExperienciaDomain turismoExperiencia = existeTurismoExperiencia(id);
        turismoExperiencia.setAtivo(!turismoExperiencia.isAtivo());
        turismoExperienciaRepository.save(turismoExperiencia);

        logger.info("Status atualizado com sucesso. ID: {}", turismoExperiencia.getId());
        return MensagemMapper.toResponse("Status atualizado com sucesso");
    }

    public MensagemResponse deletar(UUID id) {
        TurismoExperienciaDomain turismoExperiencia = existeTurismoExperiencia(id);
        turismoExperiencia.setDeletadoEm(new Date());
        turismoExperienciaRepository.save(turismoExperiencia);

        logger.info("Turismo & experiência deletado com sucesso. ID: {}", turismoExperiencia.getId());
        return MensagemMapper.toResponse("Turismo & experiência deletado com sucesso");
    }

    public TurismoExperienciaResponse buscar(UUID id) {
        TurismoExperienciaDomain turismoExperiencia = existeTurismoExperiencia(id);
        logger.info("Buscando turismo & experiência. ID: {}", turismoExperiencia.getId());
        return TurismoExperienciaMapper.toResponse(turismoExperiencia);
    }

    public Page<TurismoExperienciaResponse> listar(Pageable pageable) {
        Page<TurismoExperienciaDomain> listar = turismoExperienciaRepository.findAllByDeletadoEmIsNullOrderByNome(pageable);
        logger.info("Listando turismo & experiências. Total: {}", listar.getTotalElements());
        return listar.map(TurismoExperienciaMapper::toResponse);
    }

    public TurismoExperienciaResponse cadastrar(TurismoExperienciaRequest request) throws IOException {
        MunicipioDomain municipioExistente = existeMunicipio(request.municipioId());

        TurismoExperienciaDomain map = TurismoExperienciaMapper.toDomain(request, municipioExistente);

        String url = processarImagens(bucketName, request.nome(), "experiencia", request.imagem());
        map.setUrlImagem(url);

        TurismoExperienciaDomain salvar = this.turismoExperienciaRepository.save(map);

        logger.info("Experiência turística salva com sucesso: {}", salvar.getId());
        return TurismoExperienciaMapper.toResponse(salvar);
    }

    public TurismoExperienciaResponse atualizar(UUID id, TurismoExperienciaRequest request) throws IOException {
        MunicipioDomain municipioExistente = existeMunicipio(request.municipioId());
        TurismoExperienciaDomain turismoExperiencia = existeTurismoExperiencia(id);

        TurismoExperienciaDomain map = TurismoExperienciaMapper.toUpdate(turismoExperiencia, request,
                municipioExistente);

        if (request.imagem() != null) {
            String url = processarImagens(bucketName, request.nome(), "experiencia", request.imagem());
            map.setUrlImagem(url);
        }

        TurismoExperienciaDomain salvar = this.turismoExperienciaRepository.save(map);

        logger.info("Experiência turística atualizada com sucesso: {}", salvar.getId());
        return TurismoExperienciaMapper.toResponse(salvar);
    }

    public Page<TurismoExperienciaResponse> listarWeb(Pageable pageable) {
        Page<TurismoExperienciaDomain> page = turismoExperienciaRepository.findAllWeb(pageable);
        logger.info("Listando experiências turísticas para o web. Total: {}", page.getTotalElements());
        return page.map(TurismoExperienciaMapper::toResponse);
    }

    private TurismoExperienciaDomain existeTurismoExperiencia(UUID id) {
        return turismoExperienciaRepository.findByIdAndDeletadoEmIsNull(id)
                .orElseThrow(() -> {
                    logger.error("Turismo & experiência não encontrado. ID: {}", id);
                    return new MunicipioHandlerNotFoundException("Turismo & experiência não encontrado");
                });
    }

    private MunicipioDomain existeMunicipio(UUID id) {
        return municipioRepository.findByIdWithUrlDestaque(id)
                .orElseThrow(() -> {
                    logger.error("Município não encontrado. ID: {}", id);
                    return new MunicipioHandlerNotFoundException("Município não encontrado");
                });
    }

    private String processarImagens(String bucketName, String nome, String tipo, MultipartFile destaque)
            throws IOException {
        return storageService.uploadFile(
                bucketName,
                GerarNomeUtil.gerarNomeArquivo(nome, tipo, destaque),
                destaque.getInputStream(),
                ContentTypeUtil.renameContentTypeToWebP(destaque.getContentType()));

    }
}

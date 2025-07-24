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

import br.com.rodrigofroes.backend.DTO.request.SaborCulturaRequest;
import br.com.rodrigofroes.backend.DTO.response.MensagemResponse;
import br.com.rodrigofroes.backend.DTO.response.SaborCulturaResponse;
import br.com.rodrigofroes.backend.configuration.exception.MunicipioHandlerNotFoundException;
import br.com.rodrigofroes.backend.configuration.exception.SaborCulturaHandlerNotFoundException;
import br.com.rodrigofroes.backend.domain.MunicipioDomain;
import br.com.rodrigofroes.backend.domain.SaborCulturaDomain;
import br.com.rodrigofroes.backend.mapper.MensagemMapper;
import br.com.rodrigofroes.backend.mapper.SaborCulturaMapper;
import br.com.rodrigofroes.backend.repository.MunicipioRepository;
import br.com.rodrigofroes.backend.repository.SaborCulturaRepository;
import br.com.rodrigofroes.backend.util.ContentTypeUtil;
import br.com.rodrigofroes.backend.util.GerarNomeUtil;

@Service
public class SaborCulturaService {
    private Logger logger = LoggerFactory.getLogger(SaborCulturaService.class);

    @Autowired
    private SaborCulturaRepository saborCulturaRepository;

    @Autowired
    private MunicipioRepository municipioRepository;

    @Autowired
    private StorageService storageService;

    @Value("${spring.minio.bucket}")
    private String bucketName;

    public MensagemResponse atualizarStatus(UUID id) {
        SaborCulturaDomain saborCultura = existeSaborCultura(id);
        saborCultura.setAtivo(!saborCultura.isAtivo());
        saborCulturaRepository.save(saborCultura);

        logger.info("Status atualizado com sucesso. ID: {}", saborCultura.getId());
        return MensagemMapper.toResponse("Status atualizado com sucesso");
    }

    public MensagemResponse deletar(UUID id) {
        SaborCulturaDomain saborCultura = existeSaborCultura(id);
        saborCultura.setDeletadoEm(new Date());
        saborCulturaRepository.save(saborCultura);

        logger.info("Sabor & cultura deletado com sucesso. ID: {}", saborCultura.getId());
        return MensagemMapper.toResponse("Sabor & cultura deletado com sucesso");
    }

    public SaborCulturaResponse buscar(UUID id) {
        SaborCulturaDomain saborCultura = existeSaborCultura(id);
        logger.info("Buscando sabor & cultura. ID: {}", saborCultura.getId());
        return SaborCulturaMapper.toResponse(saborCultura);
    }

    public Page<SaborCulturaResponse> listar(Pageable pageable) {
        Page<SaborCulturaDomain> listar = saborCulturaRepository.findAllByDeletadoEmIsNullOrderByNome(pageable);
        logger.info("Listando sabor & cultura. Total: {}", listar.getTotalElements());
        return listar.map(SaborCulturaMapper::toResponse);
    }

    public SaborCulturaResponse cadastrar(SaborCulturaRequest request) throws IOException {
        MunicipioDomain municipioExistente = existeMunicipio(request.municipioId());

        SaborCulturaDomain map = SaborCulturaMapper.toDomain(request, municipioExistente);

        String url = processarImagens(bucketName, request.nome(), "experiencia", request.imagem());
        map.setUrlImagem(url);

        SaborCulturaDomain salvar = saborCulturaRepository.save(map);

        logger.info("Sabor & cultura salva com sucesso: {}", salvar.getId());
        return SaborCulturaMapper.toResponse(salvar);
    }

    public SaborCulturaResponse atualizar(UUID id, SaborCulturaRequest request) throws IOException {
        MunicipioDomain municipioExistente = existeMunicipio(request.municipioId());
        SaborCulturaDomain saborCultura = existeSaborCultura(id);

        SaborCulturaDomain map = SaborCulturaMapper.toUpdate(saborCultura, request, municipioExistente);

        if (request.imagem() != null) {
            String url = processarImagens(bucketName, request.nome(), "experiencia", request.imagem());
            map.setUrlImagem(url);
        }

        SaborCulturaDomain salvar = saborCulturaRepository.save(map);

        logger.info("Sabor & cultura atualizada com sucesso: {}", salvar.getId());
        return SaborCulturaMapper.toResponse(salvar);
    }

    public Page<SaborCulturaResponse> listarWeb(Pageable pageable) {
        Page<SaborCulturaDomain> page = saborCulturaRepository.findAllWeb(pageable);
        logger.info("Listando sabores & culturas para o web. Total: {}", page.getTotalElements());
        return page.map(SaborCulturaMapper::toResponse);
    }

    private SaborCulturaDomain existeSaborCultura(UUID id) {
        return saborCulturaRepository.findByIdAndDeletadoEmIsNull(id)
                .orElseThrow(() -> {
                    logger.error("Sabor & cultura não encontrado. ID: {}", id);
                    return new SaborCulturaHandlerNotFoundException("Sabor & cultura não encontrado");
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

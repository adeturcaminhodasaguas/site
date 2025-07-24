package br.com.rodrigofroes.backend.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.rodrigofroes.backend.DTO.request.MunicipioRequest;
import br.com.rodrigofroes.backend.DTO.response.MensagemResponse;
import br.com.rodrigofroes.backend.DTO.response.MunicipioResponse;
import br.com.rodrigofroes.backend.DTO.response.MunicipioSelectResponse;
import br.com.rodrigofroes.backend.configuration.exception.MunicipioHandlerNotFoundException;
import br.com.rodrigofroes.backend.configuration.exception.MunicipioJaCadastradoHandlerConflictException;
import br.com.rodrigofroes.backend.domain.MunicipioDomain;
import br.com.rodrigofroes.backend.mapper.MensagemMapper;
import br.com.rodrigofroes.backend.mapper.MunicipioMapper;
import br.com.rodrigofroes.backend.mapper.MunicipioSelectMapper;
import br.com.rodrigofroes.backend.repository.MunicipioRepository;
import br.com.rodrigofroes.backend.util.ContentTypeUtil;
import br.com.rodrigofroes.backend.util.GerarNomeUtil;
import br.com.rodrigofroes.backend.util.LimparStringUtil;

@Service
public class MunicipioService {

    private Logger logger = LoggerFactory.getLogger(MunicipioService.class.getName());

    @Autowired
    private MunicipioRepository municipioRepository;

    @Autowired
    private StorageService storageService;

    @Value("${spring.minio.bucket}")
    private String bucketName;

    public MensagemResponse atualizarStatus(UUID Id) {
        MunicipioDomain municipio = existeMunicipio(Id);
        municipio.setAtivo(!municipio.isAtivo());
        logger.info("Atualizando status do município. ID: {}", municipio.getId());
        municipioRepository.save(municipio);
        return MensagemMapper.toResponse("Status atualizado com sucesso");
    }

    public Page<MunicipioResponse> listar(Pageable pageable) {
        Page<MunicipioDomain> page = municipioRepository.findAllWithUrlDestaque(pageable);
        logger.info("Listando municipios. Total: {}", page.getTotalElements());

        return page.map(MunicipioMapper::toResponse);
    }

    public MunicipioResponse buscar(UUID id) {
        MunicipioDomain municipio = existeMunicipio(id);
        logger.info("Buscando município. ID: {}", municipio.getId());
        return MunicipioMapper.toResponse(municipio);
    }

    public MensagemResponse deletar(UUID id) {
        MunicipioDomain municipio = existeMunicipio(id);
        municipio.setDeletadoEm(new Date());
        logger.info("Município deletado. ID: {}", municipio.getId());
        municipioRepository.save(municipio);
        return MensagemMapper.toResponse("Município deletado com sucesso");
    }

    public MunicipioResponse cadastrar(MunicipioRequest request) throws IOException {
        String nomeLimpo = limparNome(request.nome());

        MunicipioDomain municipio = MunicipioMapper.toDomain(request);
        municipio.setNomeNormalizado(nomeLimpo);

        List<String> destaquesUrls = new ArrayList<>();

        for (MultipartFile destaque : request.destaque()) {
            String url = processarImagens(bucketName, request.nome(), "destaque", destaque);
            destaquesUrls.add(url);
        }

        String url = processarImagens(bucketName, request.nome(), "brasao", request.brasao());

        municipio.setUrlBrasao(url);
        municipio.setUrlDestaque(destaquesUrls);

        MunicipioDomain retorno = municipioRepository.save(municipio);

        logger.info("Município salvo com sucesso. ID: {}", retorno.getId());
        return MunicipioMapper.toResponse(retorno);
    }

    public MunicipioResponse atualizar(UUID id, MunicipioRequest request) throws IOException {
        atualizarNomeMunicipio(id, request.nome());

        MunicipioDomain municipioExistente = existeMunicipio(id);

        municipioExistente.setNomeNormalizado(LimparStringUtil.limpar(request.nome()));

        MunicipioDomain map = MunicipioMapper.toUpdate(municipioExistente, request);

        if (request.destaque() != null) {
            List<String> destaquesUrls = new ArrayList<>();
            for (MultipartFile destaque : request.destaque()) {
                String url = processarImagens(bucketName, request.nome(), "destaque", destaque);
                destaquesUrls.add(url);
            }
            map.setUrlDestaque(destaquesUrls);
        }

        if (request.brasao() != null) {
            String url = processarImagens(bucketName, request.nome(), "brasao", request.brasao());
            map.setUrlBrasao(url);
        }

        MunicipioDomain retorno = municipioRepository.save(map);
        logger.info("Município atualizado com sucesso. ID: {}", retorno.getId());
        return MunicipioMapper.toResponse(retorno);
    }

    public Page<MunicipioResponse> listarWeb(Pageable pageable) {
        Page<MunicipioDomain> page = municipioRepository.findAllWeb(pageable);
        logger.info("Listando municípios para o web. Total: {}", page.getTotalElements());
        return page.map(MunicipioMapper::toResponse);
    }

    public List<MunicipioSelectResponse> listaSelectMunicipio() {
        List<MunicipioDomain> municipios = municipioRepository.findSelect();
        logger.info("Listando municípios para o select. Total: {}", municipios.size());
        return MunicipioSelectMapper.toResponseList(municipios);
    }

    private void atualizarNomeMunicipio(UUID id, String nome) {
        String nomeLimpo = LimparStringUtil.limpar(nome);

        municipioRepository.findByNomeNormalizadoAndDeletadoEmIsNull(nomeLimpo)
                .ifPresent(m -> {
                    if (!m.getId().equals(id)) {
                        logger.error("Conflito de nome: '{}' já usado por ID {}", nome, m.getId());
                        throw new MunicipioHandlerNotFoundException("Município já cadastrado");
                    }
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

    private MunicipioDomain existeMunicipio(UUID id) {
        return municipioRepository.findByIdWithUrlDestaque(id)
                .orElseThrow(() -> {
                    logger.error("Município não encontrado. ID: {}", id);
                    return new MunicipioHandlerNotFoundException("Município não encontrado");
                });
    }

    private String limparNome(String nome) {
        String nomeLimpo = LimparStringUtil.limpar(nome);
        if (municipioRepository.existsByNomeNormalizado(nomeLimpo)) {
            logger.error("Município já cadastrado: {}", nome);
            throw new MunicipioJaCadastradoHandlerConflictException("Município já cadastrado");
        }
        return nomeLimpo;
    }
}

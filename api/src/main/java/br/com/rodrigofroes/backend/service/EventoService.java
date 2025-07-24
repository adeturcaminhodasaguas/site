package br.com.rodrigofroes.backend.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
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

import br.com.rodrigofroes.backend.DTO.request.EventoRequest;
import br.com.rodrigofroes.backend.DTO.response.EventoResponse;
import br.com.rodrigofroes.backend.DTO.response.MensagemResponse;
import br.com.rodrigofroes.backend.configuration.exception.DataHandlerBadRequestException;
import br.com.rodrigofroes.backend.configuration.exception.MaximoDestaqueAtivoHandlerException;
import br.com.rodrigofroes.backend.configuration.exception.MunicipioHandlerNotFoundException;
import br.com.rodrigofroes.backend.domain.EventoDomain;
import br.com.rodrigofroes.backend.domain.MunicipioDomain;
import br.com.rodrigofroes.backend.domain.enums.EventoEnum;
import br.com.rodrigofroes.backend.mapper.EventoMapper;
import br.com.rodrigofroes.backend.mapper.MensagemMapper;
import br.com.rodrigofroes.backend.repository.EventoRepository;
import br.com.rodrigofroes.backend.repository.MunicipioRepository;
import br.com.rodrigofroes.backend.util.ContentTypeUtil;
import br.com.rodrigofroes.backend.util.GerarNomeUtil;

@Service
public class EventoService {

    private Logger logger = LoggerFactory.getLogger(EventoService.class);

    @Autowired
    private MunicipioRepository municipioRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private StorageService storageService;

    @Value("${spring.minio.bucket}")
    private String bucketName;

    public List<String> listarCategorias() {
        return EventoEnum.getCategorias();
    }

    public Page<EventoResponse> listar(Pageable pageable) {
        Page<EventoDomain> eventos = eventoRepository.findAllByDeletadoEmIsNullOrderByNome(pageable);
        logger.info("Listando eventos. Total: {}", eventos.getTotalElements());
        return eventos.map(EventoMapper::toResponse);
    }

    public MensagemResponse atualizarStatus(UUID id) {
        EventoDomain evento = existeEvento(id);
        evento.setAtivo(!evento.isAtivo());
        eventoRepository.save(evento);
        logger.info("Status do evento atualizado com sucesso. ID: {}", evento.getId());
        return MensagemMapper.toResponse("Status do evento atualizado com sucesso");
    }

    public MensagemResponse deletar(UUID id) {
        EventoDomain evento = existeEvento(id);
        evento.setDeletadoEm(new Date());
        eventoRepository.save(evento);
        logger.info("Evento deletado com sucesso. ID: {}", evento.getId());
        return MensagemMapper.toResponse("Evento deletado com sucesso");
    }

    public EventoResponse atualizar(UUID id, EventoRequest request) throws IOException {
        validarData(request.data());
        validarHora(request.horaInicio(), request.horaFim());
        validarAtualizarDestaque(request);

        EventoDomain evento = existeEvento(id);

        MunicipioDomain existeMunicipio = existeMunicipio(request.municipioId());

        EventoDomain map = EventoMapper.toUpdate(evento, request, existeMunicipio);

        if (request.imagem() != null) {
            String url = processarImagens(bucketName, request.nome(), "evento", request.imagem());
            map.setUrlImagem(url);
        }

        EventoDomain atualizar = eventoRepository.save(map);
        logger.info("Evento atualizado com sucesso. ID: {}", atualizar.getId());

        return EventoMapper.toResponse(atualizar);
    }

    public EventoResponse cadastrar(EventoRequest request) throws IOException {
        validarData(request.data());
        validarHora(request.horaInicio(), request.horaFim());

        MunicipioDomain existeMunicipio = existeMunicipio(request.municipioId());

        EventoDomain evento = EventoMapper.toDomain(request, existeMunicipio);

        validarDestaque(evento);

        String url = processarImagens(bucketName, request.nome(), "evento", request.imagem());

        evento.setUrlImagem(url);

        EventoDomain salvar = eventoRepository.save(evento);
        logger.info("Evento salvo com sucesso. ID: {}", salvar.getId());

        return EventoMapper.toResponse(salvar);
    }

    public EventoResponse buscar(UUID id) {
        EventoDomain buscar = existeEvento(id);
        logger.info("Buscando evento. ID: {}", buscar.getId());
        return EventoMapper.toResponse(buscar);
    }

    private void validarAtualizarDestaque(EventoRequest request) {
        if (!request.destaque()) {
            return;
        }

        List<EventoDomain> destaquesAtivos = eventoRepository.findByDestaqueAndDeletadoEmIsNull(true);

        EventoDomain eventoNoBanco = existeEvento(request.id());

        if (eventoNoBanco.getDestaque()) {
            return;
        }

        if (destaquesAtivos.size() >= 3) {
            logger.error("Já existem 3 eventos com destaque ativo.");
            throw new MaximoDestaqueAtivoHandlerException("Limite máximo de 3 eventos com destaque atingido.");
        }
    }

    private void validarDestaque(EventoDomain domain) {
        if (domain.getDestaque() && eventoRepository.countEventosComDestaque() >= 3) {
            logger.error("Já existe um destaque ativo. Limite máximo de 3 destaques atingido.");
            throw new MaximoDestaqueAtivoHandlerException(
                    "Já existe um destaque ativo. Limite máximo de 3 destaques atingido.");
        }
    }

    private void validarHora(LocalTime horaInicio, LocalTime horaFim) {
        if (horaInicio.isAfter(horaFim)) {
            logger.error("Hora de início não pode ser após a hora de fim. Início: {}, Fim: {}", horaInicio, horaFim);
            throw new DataHandlerBadRequestException("A hora de início não pode ser posterior à hora de fim.");
        }

        if (horaFim.isBefore(horaInicio)) {
            logger.error("Hora de fim não pode ser anterior à hora de início. Hora Fim: {}", horaFim);
            throw new DataHandlerBadRequestException("A hora de fim não pode ser anterior à hora de início.");
        }
    }

    private void validarData(LocalDate data) {
        LocalDate dataAtual = LocalDate.now();
        if (data.isBefore(dataAtual)) {
            logger.error("Data inválida: {}", data);
            throw new DataHandlerBadRequestException("A data do evento não pode ser anterior à data atual.");
        }
    }

    private String processarImagens(String bucketName, String nome, String tipo, MultipartFile destaque)
            throws IOException {
        return storageService.uploadFile(
                bucketName,
                GerarNomeUtil.gerarNomeArquivo(nome, tipo, destaque),
                destaque.getInputStream(),
                ContentTypeUtil.renameContentTypeToWebP(destaque.getContentType()));

    }

    private EventoDomain existeEvento(UUID id) {
        return eventoRepository.findByIdAndDeletadoEmIsNull(id)
                .orElseThrow(() -> {
                    logger.error("Evento não encontrado. ID: {}", id);
                    return new MunicipioHandlerNotFoundException("Evento não encontrado");
                });
    }

    private MunicipioDomain existeMunicipio(UUID id) {
        return municipioRepository.findByIdAndDeletadoEmIsNull(id)
                .orElseThrow(() -> {
                    logger.error("Município não encontrado. ID: {}", id);
                    return new MunicipioHandlerNotFoundException("Município não encontrado");
                });
    }

}

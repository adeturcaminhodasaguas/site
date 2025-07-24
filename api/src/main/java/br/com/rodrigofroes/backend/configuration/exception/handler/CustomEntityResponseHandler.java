package br.com.rodrigofroes.backend.configuration.exception.handler;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.com.rodrigofroes.backend.DTO.response.ExceptionResponse;
import br.com.rodrigofroes.backend.configuration.exception.DataHandlerBadRequestException;
import br.com.rodrigofroes.backend.configuration.exception.EmailJaCadastradoHandlerConflictException;
import br.com.rodrigofroes.backend.configuration.exception.MaximoDestaqueAtivoHandlerException;
import br.com.rodrigofroes.backend.configuration.exception.MunicipioHandlerNotFoundException;
import br.com.rodrigofroes.backend.configuration.exception.MunicipioJaCadastradoHandlerConflictException;
import br.com.rodrigofroes.backend.configuration.exception.NewsletterNotFoundException;
import br.com.rodrigofroes.backend.configuration.exception.SaborCulturaHandlerNotFoundException;
import br.com.rodrigofroes.backend.configuration.exception.StorageHandlerException;
import br.com.rodrigofroes.backend.configuration.exception.UsuarioHandlerNotFoundException;
import br.com.rodrigofroes.backend.mapper.ExceptionMapper;

@ControllerAdvice
@RestController
public class CustomEntityResponseHandler extends ResponseEntityExceptionHandler {

        @ExceptionHandler(DataHandlerBadRequestException.class)
        public final ResponseEntity<ExceptionResponse> dataHandlerBadRequestException(
                        Exception ex,
                        WebRequest request) {
                ExceptionResponse exceptionResponse = ExceptionMapper.toResponse(new Date(), ex.getMessage(),
                                request.getDescription(false));
                return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
        }

        @ExceptionHandler(MaximoDestaqueAtivoHandlerException.class)
        public final ResponseEntity<ExceptionResponse> maximoDestaqueAtivoHandler(
                        Exception ex,
                        WebRequest request) {
                ExceptionResponse exceptionResponse = ExceptionMapper.toResponse(new Date(), ex.getMessage(),
                                request.getDescription(false));
                return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
        }

        @ExceptionHandler(UsuarioHandlerNotFoundException.class)
        public final ResponseEntity<ExceptionResponse> usuarioHandlerNotFound(
                        Exception ex,
                        WebRequest request) {
                ExceptionResponse exceptionResponse = ExceptionMapper.toResponse(new Date(), ex.getMessage(),
                                request.getDescription(false));
                return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
        }

        @ExceptionHandler(NewsletterNotFoundException.class)
        public final ResponseEntity<ExceptionResponse> newsletterHandlerNotFound(
                        Exception ex,
                        WebRequest request) {
                ExceptionResponse exceptionResponse = ExceptionMapper.toResponse(new Date(), ex.getMessage(),
                                request.getDescription(false));
                return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
        }

        @ExceptionHandler(MunicipioHandlerNotFoundException.class)
        public final ResponseEntity<ExceptionResponse> municipioHandlerNotFoundException(
                        Exception ex,
                        WebRequest request) {
                ExceptionResponse exceptionResponse = ExceptionMapper.toResponse(new Date(), ex.getMessage(),
                                request.getDescription(false));
                return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
        }

        @ExceptionHandler(SaborCulturaHandlerNotFoundException.class)
        public final ResponseEntity<ExceptionResponse> saborCulturaHandlerNotFoundException(
                        Exception ex,
                        WebRequest request) {
                ExceptionResponse exceptionResponse = ExceptionMapper.toResponse(new Date(), ex.getMessage(),
                                request.getDescription(false));
                return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
        }

        @ExceptionHandler(EmailJaCadastradoHandlerConflictException.class)
        public final ResponseEntity<ExceptionResponse> emailJaCadastradoHandlerConflict(
                        Exception ex,
                        WebRequest request) {
                ExceptionResponse exceptionResponse = ExceptionMapper.toResponse(new Date(), ex.getMessage(),
                                request.getDescription(false));
                return new ResponseEntity<>(exceptionResponse, HttpStatus.CONFLICT);
        }

        @ExceptionHandler(MunicipioJaCadastradoHandlerConflictException.class)
        public final ResponseEntity<ExceptionResponse> municipioJaCadastradoHandlerConflictException(
                        Exception ex,
                        WebRequest request) {
                ExceptionResponse exceptionResponse = ExceptionMapper.toResponse(new Date(), ex.getMessage(),
                                request.getDescription(false));
                return new ResponseEntity<>(exceptionResponse, HttpStatus.CONFLICT);
        }

        @ExceptionHandler(StorageHandlerException.class)
        public final ResponseEntity<ExceptionResponse> storageHandlerException(
                        Exception ex,
                        WebRequest request) {
                ExceptionResponse exceptionResponse = ExceptionMapper.toResponse(new Date(), ex.getMessage(),
                                request.getDescription(false));
                return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        @ExceptionHandler(Exception.class)
        public final ResponseEntity<ExceptionResponse> handleAllExceptions(
                        Exception ex,
                        WebRequest request) {
                ExceptionResponse exceptionResponse = ExceptionMapper.toResponse(new Date(), ex.getMessage(),
                                request.getDescription(false));
                return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
}

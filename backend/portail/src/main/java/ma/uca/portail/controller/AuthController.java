package ma.uca.portail.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.uca.portail.dto.AuthDtos;
import ma.uca.portail.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /** POST /api/auth/login — connexion étudiant ou admin */
    @PostMapping("/login")
    public ResponseEntity<AuthDtos.LoginResponse> login(
            @Valid @RequestBody AuthDtos.LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }

    /** POST /api/auth/register — création de compte */
    @PostMapping("/register")
    public ResponseEntity<AuthDtos.LoginResponse> register(
            @Valid @RequestBody AuthDtos.RegisterRequest req) {
        return ResponseEntity.ok(authService.register(req));
    }
}
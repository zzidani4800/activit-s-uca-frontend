package ma.uca.portail.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.uca.portail.dto.DemandeReservationDtos;
import ma.uca.portail.model.Utilisateur;
import ma.uca.portail.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    // ── Organisateur ─────────────────────────────────────

    /** POST /api/reservations */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DemandeReservationDtos.DemandeResponse soumettre(
            @AuthenticationPrincipal Utilisateur user,
            @RequestBody @Valid DemandeReservationDtos.DemandeRequest req) {
        return reservationService.soumettre(user, req);
    }

    /** GET /api/reservations/mes */
    @GetMapping("/mes")
    public List<DemandeReservationDtos.DemandeResponse> mesDemandes(
            @AuthenticationPrincipal Utilisateur user) {
        return reservationService.mesDemandes(user);
    }

    /** GET /api/reservations/{id} */
    @GetMapping("/{id}")
    public DemandeReservationDtos.DemandeResponse getById(
            @AuthenticationPrincipal Utilisateur user,
            @PathVariable Long id) {
        return reservationService.getById(id);
    }

    /** PUT /api/reservations/{id}/annuler */
    @PutMapping("/{id}/annuler")
    public DemandeReservationDtos.DemandeResponse annuler(
            @AuthenticationPrincipal Utilisateur user,
            @PathVariable Long id) {
        return reservationService.annuler(user, id);
    }
}
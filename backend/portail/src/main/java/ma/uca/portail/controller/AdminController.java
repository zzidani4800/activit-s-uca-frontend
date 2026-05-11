package ma.uca.portail.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.uca.portail.dto.DemandeReservationDtos;
import ma.uca.portail.dto.UtilisateurDtos;
import ma.uca.portail.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    // ── Dashboard ─────────────────────────────────────────

    /** GET /api/admin/stats */
    @GetMapping("/stats")
    public Map<String, Object> stats() {
        return adminService.getStats();
    }

    // ── Réservations ──────────────────────────────────────

    /** GET /api/admin/reservations */
    @GetMapping("/reservations")
    public List<DemandeReservationDtos.DemandeResume> toutes() {
        return adminService.toutesLesDemandes();
    }

    /** GET /api/admin/reservations/en-attente */
    @GetMapping("/reservations/en-attente")
    public List<DemandeReservationDtos.DemandeResume> enAttente() {
        return adminService.enAttente();
    }

    /** PUT /api/admin/reservations/{id}/statut */
    @PutMapping("/reservations/{id}/statut")
    public DemandeReservationDtos.DemandeResponse changerStatut(
            @PathVariable Long id,
            @Valid @RequestBody DemandeReservationDtos.DecisionRequest req) {
        return adminService.changerStatut(
            id, req.getDecision(), req.getMotif());
    }

    // ── Utilisateurs ──────────────────────────────────────

    /** GET /api/admin/utilisateurs */
    @GetMapping("/utilisateurs")
    public List<UtilisateurDtos.UtilisateurResponse> listerUtilisateurs() {
        return adminService.listerUtilisateurs();
    }

    /** PUT /api/admin/utilisateurs/{id} */
    @PutMapping("/utilisateurs/{id}")
    public UtilisateurDtos.UtilisateurResponse modifierUtilisateur(
            @PathVariable Long id,
            @Valid @RequestBody UtilisateurDtos.UpdateRequest req) {
        return adminService.modifierUtilisateur(id, req);
    }

    /** DELETE /api/admin/utilisateurs/{id} */
    @DeleteMapping("/utilisateurs/{id}")
    public ResponseEntity<Void> supprimerUtilisateur(@PathVariable Long id) {
        adminService.supprimerUtilisateur(id);
        return ResponseEntity.noContent().build();
    }
}
package ma.uca.portail.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import ma.uca.portail.model.Utilisateur;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
 
import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
 
@Component
public class JwtUtils {
 
    private final SecretKey key;
    private final long expirationMs;
 
    public JwtUtils(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.expiration-ms}") long expirationMs) {
        this.key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));
        this.expirationMs = expirationMs;
    }
 
    public String genererToken(Utilisateur user) {
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("role", user.getRole().name())
                .claim("nom", user.getPrenom() + " " + user.getNom())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key)
                .compact();
    }
 
    public String extraireEmail(String token) {
        return parseClaims(token).getSubject();
    }
 
    public boolean valider(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
 
    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}

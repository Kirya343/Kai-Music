package org.kirya343.audio.datasource;

import org.springframework.data.jpa.domain.Specification;

public class AudioFileSpecification {

    public static Specification<AudioFile> search(String query) {
        return (root, criteriaQuery, cb) -> {
            if (query == null || query.isBlank()) {
                return cb.conjunction();
            }

            String pattern = "%" + query.toLowerCase() + "%";

            return cb.or(
                cb.like(cb.lower(root.get("name")), pattern),
                cb.like(cb.lower(root.get("title")), pattern),
                cb.like(cb.lower(root.get("artist")), pattern),
                cb.like(cb.lower(root.get("album")), pattern)
            );
        };
    }
}

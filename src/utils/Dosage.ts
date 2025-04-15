
// Fonction utilitaire pour générer un nombre aléatoire
function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction utilitaire pour calculer les doses
function calculateDose(poids: number, besoin: number, total: number) {
    return total === 0 ? 0 : parseFloat((poids * (besoin / total)).toFixed(2));
}

export function generateDose(n_sol: number, p_sol: number, k_sol: number, n_culture: number, p_culture: number, k_culture: number, poids_commande: number) {
    // Calculer les besoins en nutriments
    const besoin_N = Math.max(n_culture - n_sol, 0);
    const besoin_P = Math.max(p_culture - p_sol, 0);
    const besoin_K = Math.max(k_culture - k_sol, 0);
    const total_besoin = besoin_N + besoin_P + besoin_K;

    return {
        dose_N: calculateDose(poids_commande, besoin_N, total_besoin),
        dose_P: calculateDose(poids_commande, besoin_P, total_besoin),
        dose_K: calculateDose(poids_commande, besoin_K, total_besoin),
        exces:{
            n: besoin_N < 1,
            p: besoin_P < 1,
            k: besoin_K < 1,
        }
    };
}
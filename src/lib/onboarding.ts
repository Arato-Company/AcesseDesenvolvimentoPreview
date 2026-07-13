/**
 * Maquina de estados de onboarding/paywall (mock v0, localStorage).
 * Sem auth/backend ainda — o stage simula o ciclo de vida da conta.
 *
 *   novo       -> ainda nao cadastrou empresa / preencheu perfil
 *   onboarded  -> cadastrou, mas nao pagou -> sistema em modo "preview" (opaco)
 *   ativo      -> pagou -> sistema liberado
 */

export type Stage = "novo" | "onboarded" | "ativo";
export type Audience = "empresa" | "candidato";

const KEY = (a: Audience) => `acesse:${a}:stage`;

export function getStage(audience: Audience): Stage {
  if (typeof window === "undefined") return "novo";
  try {
    const raw = window.localStorage.getItem(KEY(audience));
    if (raw === "onboarded" || raw === "ativo") return raw;
    return "novo";
  } catch {
    return "novo";
  }
}

export function setStage(audience: Audience, stage: Stage): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY(audience), stage);
  } catch {
    // ignore
  }
}

/** Home do sistema por audiencia (destino apos login quando ja cadastrado). */
export function homeFor(audience: Audience): string {
  return audience === "empresa" ? "/empresa/vitrine" : "/candidato/dashboard";
}

/** Rota de onboarding (cadastro empresa / perfil candidato). */
export function onboardingFor(audience: Audience): string {
  return audience === "empresa" ? "/empresa/cadastro" : "/candidato/cadastro";
}

/** Pagina de cobranca por audiencia. */
export function planosFor(audience: Audience): string {
  return audience === "empresa" ? "/empresa/planos" : "/candidato/planos";
}

/** Para onde o login manda, dado o stage atual. */
export function routeForStage(audience: Audience, stage: Stage): string {
  if (stage === "novo") return onboardingFor(audience);
  return homeFor(audience); // onboarded (opaco) e ativo caem no home
}

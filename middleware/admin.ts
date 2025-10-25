export default defineNuxtRouteMiddleware((to, from) => {
  const { user, isAdmin } = useAuth()
  
  // Vérifier si l'utilisateur est connecté
  if (!user.value) {
    return navigateTo('/login')
  }
  
  // Vérifier si l'utilisateur est admin
  if (!isAdmin.value) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Accès refusé. Vous devez être administrateur pour accéder à cette page.'
    })
  }
})
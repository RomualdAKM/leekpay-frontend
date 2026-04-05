import { ref, computed, onUnmounted } from 'vue'
import type { Ref } from 'vue'

interface ExpirationStatusResult {
  show: boolean
  containerClass?: string
  textClass?: string
  badgeClass?: string
  iconPath?: string
  message?: string
  badge?: string
  timeDisplay?: string
}

export function usePaymentTimer(expiresAt: Ref<string | null>, isExpiredFromBackend: Ref<boolean>) {
  const timeLeft = ref(-1)
  const isTimerInitialized = ref(false)
  let timerInterval: ReturnType<typeof setInterval> | null = null

  const startTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
    }

    timerInterval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        clearInterval(timerInterval!)
        timerInterval = null
      }
    }, 1000)
  }

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  const initTimer = (expiresAtDate: string) => {
    const expDate = new Date(expiresAtDate)
    const now = new Date()
    const diffInSeconds = Math.max(0, Math.floor((expDate.getTime() - now.getTime()) / 1000))
    timeLeft.value = diffInSeconds
    isTimerInitialized.value = true
    if (diffInSeconds > 0) {
      startTimer()
    }
  }

  const formattedTime = computed(() => {
    const t = Math.max(0, timeLeft.value)
    const minutes = Math.floor(t / 60)
    const seconds = t % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  const isPaymentExpired = computed(() => {
    if (!isTimerInitialized.value) {
      return isExpiredFromBackend.value
    }
    return isExpiredFromBackend.value || timeLeft.value <= 0
  })

  // Pré-calculer le timeDisplay séparément pour éviter de recréer tout l'objet
  const timeDisplay = computed(() => {
    const t = timeLeft.value
    if (t <= 0) return ''
    if (t <= 3600) return formattedTime.value

    const days = Math.floor(t / 86400)
    const hours = Math.floor((t % 86400) / 3600)
    const minutes = Math.floor((t % 3600) / 60)

    if (t <= 86400) {
      return hours > 0 ? `${hours}h ${minutes}min` : formattedTime.value
    }

    // Plus de 24h
    let display = days === 1 ? `${days} jour` : `${days} jours`
    if (hours > 0) display += ` ${hours}h`
    return display
  })

  // Pré-calculer le niveau de sévérité (ne change que quand timeLeft franchit un seuil)
  const severityLevel = computed(() => {
    if (isExpiredFromBackend.value) return 'expired'
    if (!isTimerInitialized.value) return 'neutral'
    if (timeLeft.value <= 0) return 'expired'
    if (timeLeft.value <= 600) return 'urgent'
    if (timeLeft.value <= 3600) return 'warning'
    if (timeLeft.value <= 86400) return 'info'
    return 'neutral'
  })

  const SEVERITY_STYLES = {
    expired: {
      containerClass: 'bg-red-50 border border-red-200 rounded-lg p-3 mb-6',
      textClass: 'text-red-700 font-medium flex items-center text-sm',
      badgeClass: 'text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full',
      iconPath: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    urgent: {
      containerClass: 'bg-red-50 border border-red-200 rounded-lg p-3 mb-6',
      textClass: 'text-red-700 font-medium flex items-center text-sm',
      badgeClass: 'text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full',
      iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    warning: {
      containerClass: 'bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6',
      textClass: 'text-orange-700 font-medium flex items-center text-sm',
      badgeClass: 'text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full',
      iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    info: {
      containerClass: 'bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6',
      textClass: 'text-blue-700 font-medium flex items-center text-sm',
      badgeClass: 'text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full',
      iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    neutral: {
      containerClass: 'bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6',
      textClass: 'text-gray-700 font-medium flex items-center text-sm',
      badgeClass: 'text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full',
      iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  } as const

  const SEVERITY_BADGES: Record<string, string> = {
    expired: 'Expiré',
    urgent: 'Urgent',
    warning: 'Attention',
    info: 'Info',
    neutral: 'Valide',
  }

  const expirationStatus = computed((): ExpirationStatusResult => {
    if (!expiresAt.value && !isExpiredFromBackend.value) {
      return { show: false }
    }

    if (!isTimerInitialized.value && !isExpiredFromBackend.value) {
      return { show: false }
    }

    const level = severityLevel.value
    const styles = SEVERITY_STYLES[level]
    const badge = SEVERITY_BADGES[level]

    const message = level === 'expired'
      ? 'Ce lien de paiement a expiré'
      : `Lien expire dans ${timeDisplay.value}`

    return {
      show: true,
      ...styles,
      message,
      badge,
      timeDisplay: timeDisplay.value,
    }
  })

  // Nettoyage automatique
  onUnmounted(() => {
    stopTimer()
  })

  return {
    timeLeft,
    formattedTime,
    expirationStatus,
    isPaymentExpired,
    initTimer,
    startTimer,
    stopTimer,
  }
}

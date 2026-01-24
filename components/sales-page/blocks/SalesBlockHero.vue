<template>
  <!-- LAYOUT: SLIDER -->
  <section 
    v-if="layout === 'slider'"
    :id="sectionId"
    :class="[template.styles.section, sectionClasses, animationClass]"
    :style="{ ...sectionStyles, ...animationStyles }"
  >
    <!-- Slides -->
    <div class="relative w-full h-full">
      <div 
        v-for="(slide, index) in props.slides"
        :key="index"
        class="absolute inset-0 transition-opacity duration-500"
        :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
      >
        <img 
          v-if="slide.image"
          :src="slide.image"
          :alt="slide.title || ''"
          :class="template.styles.image || 'w-full h-full object-cover'"
          :style="imageStyles"
        />
        <div :class="template.styles.overlay" :style="overlayStyles"></div>
      </div>
      
      <!-- Content -->
      <div :class="[template.styles.container, contentAlignmentClass]" class="min-h-screen">
        <div :class="template.styles.content">
          <span 
            v-if="props.badge && template.config?.showBadge !== false"
            :class="template.styles.badge"
            :style="badgeStyles"
          >{{ props.badge }}</span>
          
          <h1 
            :class="template.styles.title"
            :style="titleStylesFullscreen"
          >{{ currentSlideData?.title || props.title }}</h1>
          
          <p 
            v-if="currentSlideData?.subtitle || props.subtitle"
            :class="template.styles.subtitle"
            :style="{ opacity: (props.subtitleOpacity ?? 70) / 100 }"
          >{{ currentSlideData?.subtitle || props.subtitle }}</p>
          
          <div :class="[template.styles.buttonGroup, buttonAlignmentClass]" :style="buttonGroupStyles">
            <component
              :is="props.ctaUrl ? 'a' : 'button'"
              v-if="props.ctaText"
              :href="props.ctaUrl || undefined"
              :target="props.ctaUrl ? props.ctaTarget : undefined"
              :class="[template.styles.button, buttonHoverClass]"
              :style="buttonStyles"
              @click="!props.ctaUrl && $emit('cta-click')"
            >
              <span class="flex items-center gap-2">
                {{ props.ctaText }}
                <svg v-if="props.ctaIcon === 'arrow-right'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                <svg v-else-if="props.ctaIcon === 'cart'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                <svg v-else-if="props.ctaIcon === 'download'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <svg v-else-if="props.ctaIcon === 'play'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <svg v-else-if="props.ctaIcon === 'check'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </span>
            </component>
            
            <component
              :is="props.secondaryButtonUrl ? 'a' : 'button'"
              v-if="props.secondaryButtonText && template.config?.showSecondaryButton !== false"
              :href="props.secondaryButtonUrl || undefined"
              :target="props.secondaryButtonUrl ? props.secondaryButtonTarget : undefined"
              :class="[template.styles.buttonSecondary, buttonHoverClass]"
              :style="secondaryButtonStyles"
            >{{ props.secondaryButtonText }}</component>
          </div>
        </div>
      </div>
      
      <!-- Navigation Dots -->
      <div v-if="props.slides.length > 1" :class="template.styles.navigation">
        <button
          v-for="(_, index) in props.slides"
          :key="index"
          @click="currentSlide = index"
          :class="[template.styles.navDot, currentSlide === index && template.styles.navDotActive]"
        ></button>
      </div>
      
      <!-- Navigation Arrows -->
      <button 
        v-if="template.styles.navArrow && props.slides.length > 1"
        @click="prevSlide"
        :class="[template.styles.navArrow, template.styles.navArrowLeft]"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button 
        v-if="template.styles.navArrow && props.slides.length > 1"
        @click="nextSlide"
        :class="[template.styles.navArrow, template.styles.navArrowRight]"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </section>

  <!-- LAYOUT: SPLIT (Image + Texte côte à côte) -->
  <section 
    v-else-if="layout === 'split-right' || layout === 'split-left'"
    :id="sectionId"
    :class="[template.styles.section, sectionClasses, animationClass]"
    :style="{ ...sectionStyles, ...animationStyles }"
  >
    <div :class="template.styles.container">
      <!-- Content -->
      <div :class="[template.styles.content, contentAlignmentClass]">
        <span 
          v-if="props.badge && template.config?.showBadge !== false"
          :class="template.styles.badge"
          :style="badgeStyles"
        >{{ props.badge }}</span>
        
        <h1 
          :class="template.styles.title"
          :style="titleStyles"
        >{{ props.title }}</h1>
        
        <p 
          v-if="props.subtitle"
          :class="template.styles.subtitle"
          :style="subtitleStyles"
        >{{ props.subtitle }}</p>
        
        <div :class="[template.styles.buttonGroup, buttonAlignmentClass]" :style="buttonGroupStyles">
          <component
            :is="props.ctaUrl ? 'a' : 'button'"
            v-if="props.ctaText"
            :href="props.ctaUrl || undefined"
            :target="props.ctaUrl ? props.ctaTarget : undefined"
            :class="[template.styles.button, buttonHoverClass]"
            :style="buttonStyles"
            @click="!props.ctaUrl && $emit('cta-click')"
          >
            <span class="flex items-center gap-2">
              {{ props.ctaText }}
              <svg v-if="props.ctaIcon === 'arrow-right'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              <svg v-else-if="props.ctaIcon === 'cart'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              <svg v-else-if="props.ctaIcon === 'download'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <svg v-else-if="props.ctaIcon === 'play'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <svg v-else-if="props.ctaIcon === 'check'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </span>
          </component>
          
          <component
            :is="props.secondaryButtonUrl ? 'a' : 'button'"
            v-if="props.secondaryButtonText && template.config?.showSecondaryButton !== false"
            :href="props.secondaryButtonUrl || undefined"
            :target="props.secondaryButtonUrl ? props.secondaryButtonTarget : undefined"
            :class="[template.styles.buttonSecondary, buttonHoverClass]"
            :style="secondaryButtonStyles"
          >{{ props.secondaryButtonText }}</component>
        </div>
      </div>
      
      <!-- Image -->
      <div 
        v-if="props.mediaUrl"
        :class="template.styles.imageWrapper"
      >
        <img 
          :src="props.mediaUrl"
          :alt="props.title"
          :class="template.styles.image"
          :style="imageStyles"
        />
      </div>
    </div>
  </section>

  <!-- LAYOUT: FULLSCREEN (Image plein écran avec overlay) -->
  <section 
    v-else-if="layout === 'fullscreen'"
    :id="sectionId"
    :class="[template.styles.section, sectionClasses, animationClass]"
    :style="animationStyles"
  >
    <!-- Background Image -->
    <div :class="template.styles.imageWrapper">
      <img 
        v-if="props.mediaUrl"
        :src="props.mediaUrl"
        :alt="props.title"
        :class="template.styles.image"
        :style="imageStyles"
      />
    </div>
    
    <!-- Overlay -->
    <div :class="template.styles.overlay" :style="overlayStyles"></div>
    
    <!-- Content -->
    <div :class="[template.styles.container, contentAlignmentClass]">
      <span 
        v-if="props.badge && template.config?.showBadge !== false"
        :class="template.styles.badge"
        :style="badgeStyles"
      >{{ props.badge }}</span>
      
      <h1 
        :class="template.styles.title"
        :style="titleStylesFullscreen"
      >{{ props.title }}</h1>
      
      <p 
        v-if="props.subtitle"
        :class="template.styles.subtitle"
        :style="{ opacity: (props.subtitleOpacity ?? 70) / 100 }"
      >{{ props.subtitle }}</p>
      
      <div :class="[template.styles.buttonGroup, buttonAlignmentClass]" :style="buttonGroupStyles">
        <component
          :is="props.ctaUrl ? 'a' : 'button'"
          v-if="props.ctaText"
          :href="props.ctaUrl || undefined"
          :target="props.ctaUrl ? props.ctaTarget : undefined"
          :class="[template.styles.button, buttonHoverClass]"
          :style="buttonStyles"
          @click="!props.ctaUrl && $emit('cta-click')"
        >
          <span class="flex items-center gap-2">
            {{ props.ctaText }}
            <svg v-if="props.ctaIcon === 'arrow-right'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            <svg v-else-if="props.ctaIcon === 'cart'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <svg v-else-if="props.ctaIcon === 'download'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <svg v-else-if="props.ctaIcon === 'play'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <svg v-else-if="props.ctaIcon === 'check'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </span>
        </component>
        
        <component
          :is="props.secondaryButtonUrl ? 'a' : 'button'"
          v-if="props.secondaryButtonText && template.config?.showSecondaryButton !== false"
          :href="props.secondaryButtonUrl || undefined"
          :target="props.secondaryButtonUrl ? props.secondaryButtonTarget : undefined"
          :class="[template.styles.buttonSecondary, buttonHoverClass]"
          :style="secondaryButtonStyles"
        >{{ props.secondaryButtonText }}</component>
      </div>
    </div>
  </section>

  <!-- LAYOUT: VIDEO BACKGROUND -->
  <section 
    v-else-if="layout === 'video'"
    :id="sectionId"
    :class="[template.styles.section, sectionClasses, animationClass]"
    :style="animationStyles"
  >
    <!-- Background Video -->
    <div :class="template.styles.videoWrapper">
      <video 
        v-if="props.videoUrl"
        :src="props.videoUrl"
        :class="template.styles.video"
        autoplay
        muted
        loop
        playsinline
      />
    </div>
    
    <!-- Overlay -->
    <div :class="template.styles.overlay" :style="overlayStyles"></div>
    
    <!-- Content -->
    <div :class="[template.styles.container, contentAlignmentClass]">
      <span 
        v-if="props.badge && template.config?.showBadge !== false"
        :class="template.styles.badge"
        :style="badgeStyles"
      >{{ props.badge }}</span>
      
      <h1 
        :class="template.styles.title"
        :style="titleStylesFullscreen"
      >{{ props.title }}</h1>
      
      <p 
        v-if="props.subtitle"
        :class="template.styles.subtitle"
        :style="{ opacity: (props.subtitleOpacity ?? 70) / 100 }"
      >{{ props.subtitle }}</p>
      
      <div :class="[template.styles.buttonGroup, buttonAlignmentClass]" :style="buttonGroupStyles">
        <component
          :is="props.ctaUrl ? 'a' : 'button'"
          v-if="props.ctaText"
          :href="props.ctaUrl || undefined"
          :target="props.ctaUrl ? props.ctaTarget : undefined"
          :class="[template.styles.button, buttonHoverClass]"
          :style="buttonStyles"
          @click="!props.ctaUrl && $emit('cta-click')"
        >
          <span class="flex items-center gap-2">
            {{ props.ctaText }}
            <svg v-if="props.ctaIcon === 'arrow-right'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            <svg v-else-if="props.ctaIcon === 'cart'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <svg v-else-if="props.ctaIcon === 'download'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <svg v-else-if="props.ctaIcon === 'play'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <svg v-else-if="props.ctaIcon === 'check'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </span>
        </component>
        
        <component
          :is="props.secondaryButtonUrl ? 'a' : 'button'"
          v-if="props.secondaryButtonText && template.config?.showSecondaryButton !== false"
          :href="props.secondaryButtonUrl || undefined"
          :target="props.secondaryButtonUrl ? props.secondaryButtonTarget : undefined"
          :class="[template.styles.buttonSecondary, buttonHoverClass]"
          :style="secondaryButtonStyles"
        >{{ props.secondaryButtonText }}</component>
      </div>
    </div>
  </section>

  <!-- LAYOUT: STACKED (Image au-dessus du texte) -->
  <section 
    v-else-if="layout === 'stacked'"
    :id="sectionId"
    :class="[template.styles.section, sectionClasses, animationClass]"
    :style="{ ...sectionStyles, ...animationStyles }"
  >
    <!-- Image -->
    <div 
      v-if="props.mediaUrl"
      :class="template.styles.imageWrapper"
    >
      <img 
        :src="props.mediaUrl"
        :alt="props.title"
        :class="template.styles.image"
        :style="imageStyles"
      />
    </div>
    
    <!-- Content -->
    <div :class="[template.styles.content, contentAlignmentClass]">
      <span 
        v-if="props.badge && template.config?.showBadge !== false"
        :class="template.styles.badge"
        :style="badgeStyles"
      >{{ props.badge }}</span>
      
      <h1 
        :class="template.styles.title"
        :style="titleStyles"
      >{{ props.title }}</h1>
      
      <p 
        v-if="props.subtitle"
        :class="template.styles.subtitle"
        :style="subtitleStyles"
      >{{ props.subtitle }}</p>
      
      <div :class="[template.styles.buttonGroup, buttonAlignmentClass]" :style="buttonGroupStyles">
        <component
          :is="props.ctaUrl ? 'a' : 'button'"
          v-if="props.ctaText"
          :href="props.ctaUrl || undefined"
          :target="props.ctaUrl ? props.ctaTarget : undefined"
          :class="[template.styles.button, buttonHoverClass]"
          :style="buttonStyles"
          @click="!props.ctaUrl && $emit('cta-click')"
        >
          <span class="flex items-center gap-2">
            {{ props.ctaText }}
            <svg v-if="props.ctaIcon === 'arrow-right'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            <svg v-else-if="props.ctaIcon === 'cart'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <svg v-else-if="props.ctaIcon === 'download'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <svg v-else-if="props.ctaIcon === 'play'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <svg v-else-if="props.ctaIcon === 'check'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </span>
        </component>
        
        <component
          :is="props.secondaryButtonUrl ? 'a' : 'button'"
          v-if="props.secondaryButtonText && template.config?.showSecondaryButton !== false"
          :href="props.secondaryButtonUrl || undefined"
          :target="props.secondaryButtonUrl ? props.secondaryButtonTarget : undefined"
          :class="[template.styles.buttonSecondary, buttonHoverClass]"
          :style="secondaryButtonStyles"
        >{{ props.secondaryButtonText }}</component>
      </div>
    </div>
  </section>

  <!-- LAYOUT: CENTERED (Défaut - Texte centré) -->
  <section 
    v-else
    :id="sectionId"
    :class="[template.styles.section, sectionClasses, animationClass]"
    :style="{ ...sectionStyles, ...animationStyles }"
  >
    <div 
      :class="[template.styles.container, contentAlignmentClass]" 
      :style="{ ...containerDynamicStyles, display: 'flex', flexDirection: 'column' }"
    >
      <span 
        v-if="(props.badge || isEditMode) && template.config?.showBadge !== false"
        :class="[template.styles.badge, editableClasses('badge')]"
        :style="{ ...badgeStyles, ...badgePositionStyles }"
        :contenteditable="isEditMode"
        :data-placeholder="'Badge'"
        @focus="onFocus('badge')"
        @blur="onBlur($event, 'badge')"
        @keydown="onKeydown($event, true)"
        @paste="onPaste"
      >{{ props.badge }}</span>
      
      <h1 
        :class="[template.styles.title, editableClasses('title')]"
        :style="{ ...titleStyles, ...titlePositionStyles }"
        :contenteditable="isEditMode"
        :data-placeholder="'Titre principal'"
        @focus="onFocus('title')"
        @blur="onBlur($event, 'title')"
        @keydown="onKeydown($event, true)"
        @paste="onPaste"
      >{{ props.title }}</h1>
      
      <p 
        v-if="props.subtitle || isEditMode"
        :class="[template.styles.subtitle, editableClasses('subtitle')]"
        :style="{ ...subtitleStyles, ...subtitlePositionStyles }"
        :contenteditable="isEditMode"
        :data-placeholder="'Sous-titre'"
        @focus="onFocus('subtitle')"
        @blur="onBlur($event, 'subtitle')"
        @keydown="onKeydown($event, false)"
        @paste="onPaste"
      >{{ props.subtitle }}</p>
      
      <div 
        :class="[template.styles.buttonGroup, buttonAlignmentClass]" 
        :style="{ ...buttonGroupStyles, ...buttonsPositionStyles }"
      >
        <component
          :is="props.ctaUrl ? 'a' : 'button'"
          v-if="props.ctaText"
          :href="props.ctaUrl || undefined"
          :target="props.ctaUrl ? props.ctaTarget : undefined"
          :class="[template.styles.button, buttonHoverClass]"
          :style="buttonStyles"
          @click="!props.ctaUrl && $emit('cta-click')"
        >
          <span class="flex items-center gap-2">
            {{ props.ctaText }}
            <svg v-if="props.ctaIcon === 'arrow-right'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            <svg v-else-if="props.ctaIcon === 'cart'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <svg v-else-if="props.ctaIcon === 'download'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <svg v-else-if="props.ctaIcon === 'play'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <svg v-else-if="props.ctaIcon === 'check'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </span>
        </component>
        
        <component
          :is="props.secondaryButtonUrl ? 'a' : 'button'"
          v-if="props.secondaryButtonText && template.config?.showSecondaryButton !== false"
          :href="props.secondaryButtonUrl || undefined"
          :target="props.secondaryButtonUrl ? props.secondaryButtonTarget : undefined"
          :class="[template.styles.buttonSecondary, buttonHoverClass]"
          :style="secondaryButtonStyles"
        >{{ props.secondaryButtonText }}</component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { getTemplate } from '~/composables/blockTemplates'
import { useInlineEdit } from '~/composables/useInlineEdit'
import type { HeroLayout } from '~/composables/blockTemplates/hero'

interface SlideItem {
  image: string
  title?: string
  subtitle?: string
}

interface Props {
  blockId?: string  // ID du bloc pour l'édition inline
  templateId?: string
  title?: string
  subtitle?: string
  badge?: string
  // Contenu
  contentAlignment?: 'left' | 'center' | 'right'
  contentMaxWidth?: 'small' | 'medium' | 'large' | 'xlarge' | 'full'
  // Media
  mediaUrl?: string | null
  videoUrl?: string | null
  imageRadius?: 'none' | 'small' | 'medium' | 'large' | 'full'
  // Background
  backgroundType?: 'solid' | 'gradient' | 'transparent'
  backgroundColor?: string
  gradientStart?: string
  gradientEnd?: string
  gradientDirection?: 'to-r' | 'to-l' | 'to-b' | 'to-t' | 'to-br' | 'to-bl'
  // Section
  sectionHeight?: 'auto' | 'small' | 'medium' | 'large' | 'fullscreen' | 'custom'
  sectionHeightCustom?: number
  // Bouton principal
  ctaText?: string
  ctaUrl?: string
  ctaTarget?: '_self' | '_blank'
  ctaColor?: string
  ctaTextColor?: string
  ctaIcon?: string
  buttonHoverEffect?: 'none' | 'darken' | 'lighten' | 'scale' | 'lift'
  // Bouton secondaire
  secondaryButtonText?: string
  secondaryButtonUrl?: string
  secondaryButtonTarget?: '_self' | '_blank'
  secondaryButtonColor?: string
  secondaryButtonStyle?: 'outline' | 'filled' | 'ghost' | 'link'
  // Style des boutons
  buttonRadius?: 'none' | 'small' | 'medium' | 'large' | 'full'
  buttonShadow?: 'none' | 'small' | 'medium' | 'large'
  buttonSize?: 'small' | 'medium' | 'large' | 'xlarge'
  buttonWidth?: 'auto' | 'full'
  buttonBorderWidth?: 'thin' | 'medium' | 'thick'
  buttonAlignment?: 'left' | 'center' | 'right'
  // Overlay
  overlayOpacity?: number
  overlayColor?: string
  // Typography titre
  fontFamily?: string
  titleSize?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'custom'
  titleSizeCustom?: number
  titleWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black'
  titleColor?: string
  titleLetterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider'
  titleTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  titleLineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose'
  // Typography sous-titre
  subtitleFontFamily?: string
  subtitleSize?: 'small' | 'medium' | 'large' | 'xlarge'
  subtitleOpacity?: number
  subtitleColor?: string
  // Espacements
  paddingY?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
  paddingX?: 'none' | 'small' | 'medium' | 'large'
  contentGap?: 'small' | 'medium' | 'large' | 'xlarge'
  verticalAlignment?: 'start' | 'center' | 'end'
  // Badge
  badgeColor?: string
  badgeStyle?: 'pill' | 'rounded' | 'square'
  badgeSize?: 'small' | 'medium' | 'large'
  // Animation
  animation?: 'none' | 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom' | 'bounce'
  animationDuration?: number
  animationDelay?: number
  animateOnScroll?: boolean
  // Image
  imagePosition?: 'top' | 'center' | 'bottom'
  imageFilter?: 'none' | 'grayscale' | 'blur' | 'sepia' | 'brightness' | 'contrast'
  // Slider
  slides?: SlideItem[]
  autoplay?: boolean
  autoplayInterval?: number
  // Avancé
  cssId?: string
  customClasses?: string
  // Positionnement des éléments (Option 1 + 2)
  elementsOrder?: ('badge' | 'title' | 'subtitle' | 'buttons')[]
  badgeOffsetY?: number
  titleOffsetY?: number
  subtitleOffsetY?: number
  buttonsOffsetY?: number
}

const props = withDefaults(defineProps<Props>(), {
  blockId: '',
  templateId: 'hero-centered-clean',
  title: 'Titre principal',
  subtitle: 'Sous-titre de votre offre',
  badge: '',
  contentAlignment: 'center',
  contentMaxWidth: 'large',
  mediaUrl: null,
  videoUrl: null,
  imageRadius: 'none',
  backgroundType: 'solid',
  backgroundColor: '#ffffff',
  gradientStart: '#667eea',
  gradientEnd: '#764ba2',
  gradientDirection: 'to-r',
  sectionHeight: 'auto',
  sectionHeightCustom: 600,
  ctaText: 'Acheter maintenant',
  ctaUrl: '',
  ctaTarget: '_self',
  ctaColor: '#1f2937',
  ctaTextColor: '',
  ctaIcon: '',
  buttonHoverEffect: 'none',
  secondaryButtonText: '',
  secondaryButtonUrl: '',
  secondaryButtonTarget: '_self',
  secondaryButtonColor: '',
  secondaryButtonStyle: 'outline',
  buttonRadius: 'none',
  buttonShadow: 'none',
  buttonSize: 'medium',
  buttonWidth: 'auto',
  buttonBorderWidth: 'medium',
  buttonAlignment: 'center',
  overlayOpacity: 50,
  overlayColor: '#000000',
  fontFamily: '',
  titleSize: 'medium',
  titleSizeCustom: 48,
  titleWeight: 'bold',
  titleColor: '',
  titleLetterSpacing: 'normal',
  titleTransform: 'none',
  titleLineHeight: 'normal',
  subtitleFontFamily: '',
  subtitleSize: 'medium',
  subtitleOpacity: 70,
  subtitleColor: '',
  paddingY: 'large',
  paddingX: 'medium',
  contentGap: 'medium',
  verticalAlignment: 'center',
  badgeColor: '',
  badgeStyle: 'pill',
  badgeSize: 'medium',
  animation: 'none',
  animationDuration: 500,
  animationDelay: 0,
  animateOnScroll: false,
  imagePosition: 'center',
  imageFilter: 'none',
  slides: () => [],
  autoplay: true,
  autoplayInterval: 5000,
  cssId: '',
  customClasses: '',
  // Positionnement des éléments (Option 1 + 2)
  elementsOrder: () => ['badge', 'title', 'subtitle', 'buttons'] as ('badge' | 'title' | 'subtitle' | 'buttons')[],
  badgeOffsetY: 0,
  titleOffsetY: 0,
  subtitleOffsetY: 0,
  buttonsOffsetY: 0,
})

defineEmits(['cta-click'])

// Contexte d'édition inline
const { isEditMode, emitPropUpdate, startEditing, stopEditing, activeEditField } = useInlineEdit()

// Champ en cours d'édition
const isFieldActive = (field: string) => activeEditField.value === field

// Classes pour les éléments éditables
const editableClasses = (field: string) => {
  if (!isEditMode.value) return ''
  return [
    'outline-none',
    'cursor-text',
    'transition-all',
    'duration-150',
    'min-w-[20px]',
    isFieldActive(field) 
      ? 'ring-2 ring-emerald-400 ring-offset-2 rounded-sm' 
      : 'hover:ring-1 hover:ring-emerald-300 hover:ring-offset-1 rounded-sm'
  ].join(' ')
}

// Handlers d'édition
const onFocus = (field: string) => {
  if (props.blockId) {
    startEditing(props.blockId, field)
  }
}

const onBlur = (e: FocusEvent, field: string) => {
  const target = e.target as HTMLElement
  const newValue = target.innerText || ''
  
  if (props.blockId) {
    emitPropUpdate(props.blockId, field, newValue)
    stopEditing()
  }
}

const onKeydown = (e: KeyboardEvent, singleLine: boolean) => {
  if (singleLine && e.key === 'Enter') {
    e.preventDefault()
    ;(e.target as HTMLElement).blur()
  }
  if (e.key === 'Escape') {
    ;(e.target as HTMLElement).blur()
  }
}

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const text = e.clipboardData?.getData('text/plain') || ''
  document.execCommand('insertText', false, text)
}

// Slider state
const currentSlide = ref(0)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const currentSlideData = computed(() => {
  if (props.slides && props.slides.length > 0) {
    return props.slides[currentSlide.value]
  }
  return null
})

function nextSlide() {
  if (props.slides && props.slides.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % props.slides.length
  }
}

function prevSlide() {
  if (props.slides && props.slides.length > 0) {
    currentSlide.value = currentSlide.value === 0 
      ? props.slides.length - 1 
      : currentSlide.value - 1
  }
}

onMounted(() => {
  if (props.autoplay && props.slides && props.slides.length > 1) {
    autoplayTimer = setInterval(nextSlide, props.autoplayInterval)
  }
})

onUnmounted(() => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
  }
})

// Template actif
const template = computed(() => {
  return getTemplate('hero', props.templateId) || {
    id: 'hero-centered-clean',
    name: 'Default',
    category: 'minimal' as const,
    config: { layout: 'centered', showBadge: false, showSecondaryButton: false },
    styles: {
      section: 'py-20 md:py-32 px-6',
      container: 'max-w-3xl mx-auto text-center',
      title: 'text-4xl md:text-5xl font-light tracking-tight',
      subtitle: 'text-lg mt-6 opacity-70',
      buttonGroup: 'mt-10 flex justify-center gap-4',
      button: 'px-8 py-4 text-sm font-medium uppercase tracking-widest transition-colors duration-200',
      buttonSecondary: 'px-8 py-4 text-sm font-medium uppercase tracking-widest border-2 transition-colors duration-200',
    }
  }
})

// Layout déterminé par le template
const layout = computed<HeroLayout>(() => {
  return (template.value.config?.layout as HeroLayout) || 'centered'
})

const sectionStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Background
  if (layout.value !== 'fullscreen' && layout.value !== 'video') {
    if (props.backgroundType === 'gradient') {
      const dirMap: Record<string, string> = {
        'to-r': 'to right',
        'to-l': 'to left',
        'to-b': 'to bottom',
        'to-t': 'to top',
        'to-br': 'to bottom right',
        'to-bl': 'to bottom left',
      }
      const dir = dirMap[props.gradientDirection || 'to-r'] || 'to right'
      styles.background = `linear-gradient(${dir}, ${props.gradientStart}, ${props.gradientEnd})`
    } else if (props.backgroundType !== 'transparent') {
      styles.backgroundColor = props.backgroundColor
    }
  }
  
  // Hauteur section
  if (props.sectionHeight === 'custom' && props.sectionHeightCustom) {
    styles.minHeight = `${props.sectionHeightCustom}px`
  } else if (props.sectionHeight && props.sectionHeight !== 'auto') {
    styles.minHeight = sectionHeightMap[props.sectionHeight] || 'auto'
  }
  
  // Padding
  const py = paddingYMap[props.paddingY || 'large'] || '8rem'
  const px = paddingXMap[props.paddingX || 'medium'] || '1.5rem'
  styles.paddingTop = py
  styles.paddingBottom = py
  styles.paddingLeft = px
  styles.paddingRight = px
  
  // ID CSS
  if (props.cssId) {
    styles.scrollMarginTop = '80px'
  }
  
  return styles
})

const overlayStyles = computed(() => {
  return {
    backgroundColor: props.overlayColor || '#000000',
    opacity: (props.overlayOpacity || 50) / 100
  }
})

const textColor = computed(() => {
  const bg = props.backgroundColor || '#ffffff'
  const hex = bg.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#1f2937' : '#ffffff'
})

// Mappings pour les nouvelles props
const titleSizeMap: Record<string, string> = {
  'small': '1.5rem',
  'medium': '2.5rem',
  'large': '3.5rem',
  'xlarge': '4.5rem',
  'xxlarge': '5.5rem',
  'custom': 'custom'
}

const titleWeightMap: Record<string, string> = {
  'light': '300',
  'normal': '400',
  'medium': '500',
  'semibold': '600',
  'bold': '700',
  'black': '900'
}

const letterSpacingMap: Record<string, string> = {
  'tighter': '-0.05em',
  'tight': '-0.025em',
  'normal': '0',
  'wide': '0.025em',
  'wider': '0.05em'
}

const lineHeightMap: Record<string, string> = {
  'tight': '1.1',
  'normal': '1.3',
  'relaxed': '1.5',
  'loose': '1.75'
}

const paddingYMap: Record<string, string> = {
  'none': '0',
  'small': '3rem',
  'medium': '5rem',
  'large': '8rem',
  'xlarge': '12rem'
}

const paddingXMap: Record<string, string> = {
  'none': '0',
  'small': '1rem',
  'medium': '1.5rem',
  'large': '2rem'
}

const contentGapMap: Record<string, string> = {
  'small': '1rem',
  'medium': '1.5rem',
  'large': '2.5rem',
  'xlarge': '4rem'
}

const contentMaxWidthMap: Record<string, string> = {
  'small': '640px',
  'medium': '768px',
  'large': '1024px',
  'xlarge': '1280px',
  'full': '100%'
}

const sectionHeightMap: Record<string, string> = {
  'auto': 'auto',
  'small': '400px',
  'medium': '600px',
  'large': '800px',
  'fullscreen': '100vh'
}

const subtitleSizeMap: Record<string, string> = {
  'small': '0.875rem',
  'medium': '1.125rem',
  'large': '1.375rem',
  'xlarge': '1.5rem'
}

const badgeSizeMap: Record<string, { px: string, py: string, fontSize: string }> = {
  'small': { px: '0.5rem', py: '0.25rem', fontSize: '0.625rem' },
  'medium': { px: '0.75rem', py: '0.35rem', fontSize: '0.75rem' },
  'large': { px: '1rem', py: '0.5rem', fontSize: '0.875rem' }
}

const buttonSizeMap: Record<string, { px: string, py: string, fontSize: string }> = {
  'small': { px: '1rem', py: '0.5rem', fontSize: '0.75rem' },
  'medium': { px: '1.5rem', py: '0.875rem', fontSize: '0.875rem' },
  'large': { px: '2rem', py: '1.125rem', fontSize: '1rem' },
  'xlarge': { px: '2.5rem', py: '1.375rem', fontSize: '1.125rem' }
}

const borderWidthMap: Record<string, string> = {
  'thin': '1px',
  'medium': '2px',
  'thick': '3px'
}

const badgeStyleMap: Record<string, string> = {
  'pill': '9999px',
  'rounded': '6px',
  'square': '0'
}

const imagePositionMap: Record<string, string> = {
  'top': 'top',
  'center': 'center',
  'bottom': 'bottom'
}

const imageFilterMap: Record<string, string> = {
  'none': 'none',
  'grayscale': 'grayscale(100%)',
  'blur': 'blur(2px)',
  'sepia': 'sepia(100%)',
  'brightness': 'brightness(1.1)',
  'contrast': 'contrast(1.2)'
}

const titleStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Couleur
  styles.color = props.titleColor || textColor.value
  
  // Police
  if (props.fontFamily) {
    styles.fontFamily = props.fontFamily
  }
  
  // Taille du titre
  if (props.titleSize === 'custom' && props.titleSizeCustom) {
    styles.fontSize = `${props.titleSizeCustom}px`
  } else {
    styles.fontSize = titleSizeMap[props.titleSize || 'medium'] || '2.5rem'
  }
  
  // Poids
  styles.fontWeight = titleWeightMap[props.titleWeight || 'bold'] || '700'
  
  // Espacement des lettres
  styles.letterSpacing = letterSpacingMap[props.titleLetterSpacing || 'normal'] || '0'
  
  // Interligne
  styles.lineHeight = lineHeightMap[props.titleLineHeight || 'normal'] || '1.3'
  
  // Transformation
  if (props.titleTransform && props.titleTransform !== 'none') {
    styles.textTransform = props.titleTransform
  }
  
  return styles
})

const subtitleStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Couleur
  if (props.subtitleColor) {
    styles.color = props.subtitleColor
  } else {
    styles.color = textColor.value
  }
  
  // Opacité
  styles.opacity = String((props.subtitleOpacity ?? 70) / 100)
  
  // Police
  if (props.subtitleFontFamily) {
    styles.fontFamily = props.subtitleFontFamily
  } else if (props.fontFamily) {
    styles.fontFamily = props.fontFamily
  }
  
  // Taille
  styles.fontSize = subtitleSizeMap[props.subtitleSize || 'medium'] || '1.125rem'
  
  return styles
})

const titleStylesFullscreen = computed(() => {
  const styles: Record<string, string> = {}
  
  // Couleur explicitement blanche pour fullscreen
  styles.color = props.titleColor || '#ffffff'
  
  if (props.fontFamily) {
    styles.fontFamily = props.fontFamily
  }
  
  // Taille du titre
  if (props.titleSize === 'custom' && props.titleSizeCustom) {
    styles.fontSize = `${props.titleSizeCustom}px`
  } else {
    styles.fontSize = titleSizeMap[props.titleSize || 'medium'] || '2.5rem'
  }
  
  // Poids
  styles.fontWeight = titleWeightMap[props.titleWeight || 'bold'] || '700'
  
  // Espacement des lettres
  styles.letterSpacing = letterSpacingMap[props.titleLetterSpacing || 'normal'] || '0'
  
  // Interligne
  styles.lineHeight = lineHeightMap[props.titleLineHeight || 'normal'] || '1.3'
  
  // Transformation
  if (props.titleTransform && props.titleTransform !== 'none') {
    styles.textTransform = props.titleTransform
  }
  
  return styles
})

const contentAlignmentClass = computed(() => {
  const alignMap: Record<string, string> = {
    'left': 'text-left items-start',
    'center': 'text-center items-center',
    'right': 'text-right items-end'
  }
  return alignMap[props.contentAlignment || 'center'] || 'text-center items-center'
})

const containerMaxWidthStyle = computed(() => {
  return {
    maxWidth: contentMaxWidthMap[props.contentMaxWidth || 'large'] || '1024px'
  }
})

const verticalAlignmentClass = computed(() => {
  const alignMap: Record<string, string> = {
    'start': 'justify-start',
    'center': 'justify-center',
    'end': 'justify-end'
  }
  return alignMap[props.verticalAlignment || 'center'] || 'justify-center'
})

const sectionDynamicStyles = computed(() => {
  // Maintenant intégré dans sectionStyles
  return {}
})

const containerDynamicStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Gap entre éléments
  styles.gap = contentGapMap[props.contentGap || 'medium'] || '1.5rem'
  
  // Max width
  styles.maxWidth = contentMaxWidthMap[props.contentMaxWidth || 'large'] || '1024px'
  
  return styles
})

// Classe dynamique pour l'alignement (override les classes Tailwind)
const buttonAlignmentClass = computed(() => {
  const alignMap: Record<string, string> = {
    'left': '!justify-start',
    'center': '!justify-center',
    'right': '!justify-end'
  }
  return alignMap[props.buttonAlignment || 'center'] || '!justify-center'
})

const buttonGroupStyles = computed(() => {
  return {}
})

const imageStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // Position de l'image
  styles.objectPosition = imagePositionMap[props.imagePosition || 'center'] || 'center'
  
  // Filtre
  const filter = imageFilterMap[props.imageFilter || 'none'] || 'none'
  if (filter !== 'none') {
    styles.filter = filter
  }
  
  // Arrondi image
  if (props.imageRadius && props.imageRadius !== 'none') {
    styles.borderRadius = radiusMap[props.imageRadius] || '0'
  }
  
  return styles
})

const animationClass = computed(() => {
  const anim = props.animation || 'none'
  if (anim === 'none') return ''
  return `animate-${anim}`
})

const animationStyles = computed(() => {
  if (props.animation === 'none') return {}
  return {
    animationDuration: `${props.animationDuration || 500}ms`,
    animationDelay: `${props.animationDelay || 0}ms`,
    animationFillMode: 'both'
  }
})

const sectionId = computed(() => props.cssId || undefined)
const sectionClasses = computed(() => props.customClasses || '')

// ============ POSITIONNEMENT DES ÉLÉMENTS (Option 1 + 2) ============

// Calcul de l'ordre CSS pour chaque élément
const getElementOrder = (element: string): number => {
  const order = props.elementsOrder || ['badge', 'title', 'subtitle', 'buttons']
  return order.indexOf(element as any)
}

// Styles avec offset pour le badge
const badgePositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.badgeOffsetY || 0
  if (offset !== 0) {
    styles.transform = `translateY(${offset}px)`
  }
  styles.order = String(getElementOrder('badge'))
  return styles
})

// Styles avec offset pour le titre
const titlePositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.titleOffsetY || 0
  if (offset !== 0) {
    styles.transform = `translateY(${offset}px)`
  }
  styles.order = String(getElementOrder('title'))
  return styles
})

// Styles avec offset pour le sous-titre
const subtitlePositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.subtitleOffsetY || 0
  if (offset !== 0) {
    styles.transform = `translateY(${offset}px)`
  }
  styles.order = String(getElementOrder('subtitle'))
  return styles
})

// Styles avec offset pour les boutons
const buttonsPositionStyles = computed(() => {
  const styles: Record<string, string> = {}
  const offset = props.buttonsOffsetY || 0
  if (offset !== 0) {
    styles.transform = `translateY(${offset}px)`
  }
  styles.order = String(getElementOrder('buttons'))
  return styles
})

// ============ FIN POSITIONNEMENT ============

// Mapping des valeurs de border-radius
const radiusMap: Record<string, string> = {
  'none': '0',
  'small': '4px',
  'medium': '8px',
  'large': '16px',
  'full': '9999px'
}

// Mapping des valeurs de box-shadow
const shadowMap: Record<string, string> = {
  'none': 'none',
  'small': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
  'medium': '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.08)',
  'large': '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.1)'
}

const buttonStyles = computed(() => {
  const ctaColor = props.ctaColor || '#1f2937'
  const hex = ctaColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  const defaultBtnSize = { px: '1.5rem', py: '0.875rem', fontSize: '0.875rem' }
  const btnSize = buttonSizeMap[props.buttonSize || 'medium'] ?? defaultBtnSize
  
  const styles: Record<string, string> = {
    backgroundColor: ctaColor,
    color: props.ctaTextColor || (luminance > 0.5 ? '#1f2937' : '#ffffff'),
    borderRadius: radiusMap[props.buttonRadius || 'none'] || '0',
    boxShadow: shadowMap[props.buttonShadow || 'none'] || 'none',
    paddingLeft: btnSize.px,
    paddingRight: btnSize.px,
    paddingTop: btnSize.py,
    paddingBottom: btnSize.py,
    fontSize: btnSize.fontSize,
    width: props.buttonWidth === 'full' ? '100%' : 'auto',
    transition: 'all 0.2s ease',
  }
  
  return styles
})

const buttonHoverClass = computed(() => {
  const effectMap: Record<string, string> = {
    'none': '',
    'darken': 'hover:brightness-90',
    'lighten': 'hover:brightness-110',
    'scale': 'hover:scale-105',
    'lift': 'hover:-translate-y-1 hover:shadow-lg'
  }
  return effectMap[props.buttonHoverEffect || 'none'] || ''
})

const secondaryButtonStyles = computed(() => {
  const style = props.secondaryButtonStyle || 'outline'
  const color = props.secondaryButtonColor || props.ctaColor || textColor.value
  const defaultBtnSize = { px: '1.5rem', py: '0.875rem', fontSize: '0.875rem' }
  const btnSize = buttonSizeMap[props.buttonSize || 'medium'] ?? defaultBtnSize
  const bw = borderWidthMap[props.buttonBorderWidth || 'medium'] || '2px'
  
  const baseStyles: Record<string, string> = {
    borderRadius: radiusMap[props.buttonRadius || 'none'] || '0',
    boxShadow: shadowMap[props.buttonShadow || 'none'] || 'none',
    paddingLeft: btnSize.px,
    paddingRight: btnSize.px,
    paddingTop: btnSize.py,
    paddingBottom: btnSize.py,
    fontSize: btnSize.fontSize,
    borderWidth: bw,
    width: props.buttonWidth === 'full' ? '100%' : 'auto',
    transition: 'all 0.2s ease',
  }
  
  if (style === 'filled') {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return {
      ...baseStyles,
      backgroundColor: color,
      borderColor: color,
      color: luminance > 0.5 ? '#1f2937' : '#ffffff',
    }
  } else if (style === 'ghost') {
    return {
      ...baseStyles,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: color,
    }
  } else if (style === 'link') {
    return {
      ...baseStyles,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: '0',
      color: color,
      textDecoration: 'underline',
      padding: '0',
    }
  } else {
    // outline (default)
    return {
      ...baseStyles,
      backgroundColor: 'transparent',
      borderColor: color,
      color: color,
    }
  }
})

const badgeStyles = computed(() => {
  const badgeColor = props.badgeColor || props.ctaColor || '#1f2937'
  const badgeRadius = badgeStyleMap[props.badgeStyle || 'pill'] || '9999px'
  const defaultBadgeSize = { px: '0.75rem', py: '0.35rem', fontSize: '0.75rem' }
  const badgeS = badgeSizeMap[props.badgeSize || 'medium'] ?? defaultBadgeSize
  
  return {
    backgroundColor: `${badgeColor}15`,
    color: badgeColor,
    borderRadius: badgeRadius,
    paddingLeft: badgeS.px,
    paddingRight: badgeS.px,
    paddingTop: badgeS.py,
    paddingBottom: badgeS.py,
    fontSize: badgeS.fontSize,
  }
})
</script>

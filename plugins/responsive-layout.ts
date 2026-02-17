export default defineNuxtPlugin(() => {
  const config = useAppConfig()
  const nav = config.navbar.heights
  const ann = config.announcement.enabled ? config.announcement.heights : { mobile: '0px', tablet: '0px', desktop: '0px' }
  const sectionSpacing = config.sectionSpacing?.default ?? { mobile: '48px', tablet: '56px', desktop: '24px' }

  useHead({
    style: [{
      children: `
        :root {
          --navbar-height: ${nav.mobile};
          --announcement-height: ${ann.mobile};
          --header-offset: calc(var(--navbar-height) + var(--announcement-height));
          --section-gap-default: ${sectionSpacing.mobile};
        }
        @media (min-width: 768px) {
          :root {
            --navbar-height: ${nav.tablet || nav.desktop};
            --announcement-height: ${ann.tablet || ann.desktop};
            --section-gap-default: ${sectionSpacing.tablet || sectionSpacing.desktop};
          }
        }
        @media (min-width: 1024px) {
          :root {
            --navbar-height: ${nav.desktop};
            --announcement-height: ${ann.desktop};
            --section-gap-default: ${sectionSpacing.desktop};
          }
        }
      `
    }]
  })
})

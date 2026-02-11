<template>
  <div class="contact-page mx-auto bg-backgroundColor min-h-[98vh] pt-12 md:pt-16 pb-12 md:pb-32 flex flex-col items-center px-4 lg:px-8 md:px-0" :style="responsiveCSSVars">
    <img v-motion v-bind="fadeUpSubtle()" 
      :src="logoUrl" 
      :alt="`${organizationName} Logo`" 
      class="contact-logo object-cover" />
    <h2 v-motion v-bind="fadeUpSubtle(50)" class="text-[20px] md:text-[32px] font-semibold text-center mt-6 md:mt-12 px-4 lg:px-12">
      {{ pageConfig?.pageTitle || pageConfig?.title || 'Contact Us: Fill out the form and hear back from us' }}
    </h2>
    <div v-motion v-bind="fadeUpSubtle(100)" class="max-w-[1056px] w-full mx-auto mt-4">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 px-2 lg:px-6">
        <div>
          <label class="block text-lg md:text-xl text-black mb-1">{{ pageConfig?.form?.labels?.name || 'Name' }}</label>
          <input v-model="formData.name" :placeholder="pageConfig?.form?.placeholders?.name || 'First and Last'" type="text" :class="[
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentColor1',
            errors.name ? 'border-red-500' : 'border-gray-300'
          ]" />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <div>
          <label class="block text-lg md:text-xl text-black mb-1">{{ pageConfig?.form?.labels?.age || 'Age' }}</label>
          <input v-model="formData.age" :placeholder="pageConfig?.form?.placeholders?.age || 'In Years'" type="number" min="1" max="120" :class="[
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentColor1',
            errors.age ? 'border-red-500' : 'border-gray-300'
          ]" />
          <p v-if="errors.age" class="text-red-500 text-sm mt-1">{{ errors.age }}</p>
        </div>

        <div>
          <label class="block text-lg md:text-xl text-black mb-1">{{ pageConfig?.form?.labels?.email || 'Email' }}</label>
          <input v-model="formData.email" :placeholder="pageConfig?.form?.placeholders?.email || 'Main Contact'" type="email" :class="[
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentColor1',
            errors.email ? 'border-red-500' : 'border-gray-300'
          ]" />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <label class="block text-lg md:text-xl text-black mb-1">{{ pageConfig?.form?.labels?.message || 'Message' }}</label>
          <textarea v-model="formData.message" :placeholder="pageConfig?.form?.placeholders?.message || 'What would you like to say...'" rows="4" :class="[
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accentColor1',
            errors.message ? 'border-red-500' : 'border-gray-300'
          ]"></textarea>
          <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
        </div>

        <div class="flex justify-center">
          <UiButton type="submit" width="170px" height="44px" fontSize="24" ghost :disabled="isSubmitting">
            {{ pageConfig?.form?.submitButton || 'Submit' }}
            <svg class="w-[12px] md:w-[16px] ml-4" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.2643 8.70829H1.79135C1.44898 8.70829 1.1618 8.59229 0.929804 8.36029C0.697804 8.12829 0.582206 7.84151 0.583012 7.49995C0.583012 7.15759 0.699012 6.87041 0.931012 6.63841C1.16301 6.40641 1.44979 6.29081 1.79135 6.29162H15.2643L11.8205 2.84787C11.5788 2.6062 11.4628 2.32426 11.4725 2.00204C11.4822 1.67981 11.5982 1.39787 11.8205 1.1562C12.0622 0.914536 12.3494 0.788466 12.6821 0.777994C13.0147 0.767522 13.3015 0.883522 13.5424 1.12599L19.0705 6.65412C19.1913 6.77495 19.2771 6.90586 19.3279 7.04683C19.3786 7.1878 19.4036 7.33884 19.4028 7.49995C19.4028 7.66106 19.3774 7.81211 19.3267 7.95308C19.2759 8.09405 19.1905 8.22495 19.0705 8.34579L13.5424 13.8739C13.3007 14.1156 13.0139 14.2316 12.6821 14.2219C12.3502 14.2122 12.063 14.0862 11.8205 13.8437C11.599 13.602 11.483 13.3201 11.4725 12.9979C11.462 12.6756 11.578 12.3937 11.8205 12.152L15.2643 8.70829Z"
                fill="currentColor" />
            </svg>
          </UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useMotionPresets } from '~/composables/useMotionPresets'

const props = defineProps({
  pageConfig: {
    type: Object,
    required: true
  }
});

// Use shared composables
const { fadeUpSubtle } = useMotionPresets();

const logoUrl = computed(() => props.pageConfig?.logo?.src || '/assets/images/brand/logo-secondary-1.svg')
const organizationName = computed(() => props.pageConfig?.logo?.alt || 'Serenova')

// CSS variables for responsive logo sizes - read directly from pageConfig.logo.sizes
const responsiveCSSVars = computed(() => ({
  '--contact-logo-height': props.pageConfig?.logo?.sizes?.mobile || '56px',
  '--contact-logo-height-tablet': props.pageConfig?.logo?.sizes?.tablet || props.pageConfig?.logo?.sizes?.desktop || '72px',
  '--contact-logo-height-desktop': props.pageConfig?.logo?.sizes?.desktop || '88px'
}))

// Form data state
const formData = reactive({
  name: '',
  age: '',
  email: '',
  message: ''
})

// Form errors state
const errors = reactive({
  name: '',
  age: '',
  email: '',
  message: ''
})

// Submission state
const isSubmitting = ref(false)

// Validation functions
const validateName = (name) => {
  const validation = props.pageConfig?.form?.validation
  if (!name.trim()) {
    return validation?.nameRequired || 'Name is required'
  }
  if (name.trim().length < 2) {
    return validation?.nameMinLength || 'Name must be at least 2 characters'
  }
  return ''
}

const validateAge = (age) => {
  const validation = props.pageConfig?.form?.validation
  if (!age) {
    return validation?.ageRequired || 'Age is required'
  }
  const ageNum = parseInt(age)
  if (isNaN(ageNum)) {
    return validation?.ageInvalid || 'Age must be a valid number'
  }
  if (ageNum < 1 || ageNum > 120) {
    return validation?.ageRange || 'Age must be between 1 and 120'
  }
  return ''
}

const validateEmail = (email) => {
  const validation = props.pageConfig?.form?.validation
  if (!email) {
    return validation?.emailRequired || 'Email is required'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return validation?.emailInvalid || 'Please enter a valid email address'
  }
  return ''
}

const validateMessage = (message) => {
  const validation = props.pageConfig?.form?.validation
  if (!message.trim()) {
    return validation?.messageRequired || 'Message is required'
  }
  if (message.trim().length < 10) {
    return validation?.messageMinLength || 'Message must be at least 10 characters'
  }
  return ''
}

// Clear all errors
const clearErrors = () => {
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
}

// Validate entire form
const validateForm = () => {
  clearErrors()

  const nameError = validateName(formData.name)
  const ageError = validateAge(formData.age)
  const emailError = validateEmail(formData.email)
  const messageError = validateMessage(formData.message)

  if (nameError) errors.name = nameError
  if (ageError) errors.age = ageError
  if (emailError) errors.email = emailError
  if (messageError) errors.message = messageError

  return !nameError && !ageError && !emailError && !messageError
}

// Prepare payload for API
const preparePayload = () => {
  return {
    name: formData.name.trim(),
    age: parseInt(formData.age),
    email: formData.email.trim().toLowerCase(),
    message: formData.message.trim(),
    timestamp: new Date().toISOString(),
    source: 'contact-form'
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  try {
    isSubmitting.value = true

    // Prepare the payload
    const payload = preparePayload()

    // TODO: Replace with actual API call when endpoint is ready
    // const response = await $fetch('/api/contact', {
    //   method: 'POST',
    //   body: payload
    // })

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Reset form after successful submission
    Object.keys(formData).forEach(key => {
      formData[key] = ''
    })

    // Show success message (you can add toast notifications here)
    alert(props.pageConfig?.form?.successMessage || 'Thank you for your message! We\'ll get back to you soon.')

  } catch (error) {
    console.error('❌ Form submission error:', error)
    alert(props.pageConfig?.form?.errorMessage || 'There was an error submitting your form. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Responsive logo sizing using CSS variables - no JS flicker */
.contact-logo {
  height: var(--contact-logo-height);
  width: auto;
}

@media (min-width: 768px) {
  .contact-logo {
    height: var(--contact-logo-height-tablet);
  }
}

@media (min-width: 1024px) {
  .contact-logo {
    height: var(--contact-logo-height-desktop);
  }
}
</style>

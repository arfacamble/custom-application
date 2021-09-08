<template>
  <div class="h-screen flex justify-center items-center">
    <Application
      v-if="applicationData && applicationData.companyName"
      :companyName="applicationData.companyName"
      :primaryColor="applicationData.primaryColor"
      :backgroundColor="applicationData.backgroundColor"
      :secondaryColor="applicationData.secondaryColor"
      :headersFont="applicationData.headersFont"
      :bodyFont="applicationData.bodyFont"
      :fontLink="applicationData.fontLink"
      :jobTitle="applicationData.jobTitle"
      :logoUrl="applicationData.logoUrl"
      :cover="applicationData.cover"
      :education="applicationData.education"
      :experience="applicationData.experience"
      :hobbies="applicationData.hobbies"
      :navTabs="applicationData.navTabs"
      :projects="applicationData.projects"
      :values="applicationData.values"
    />
    <SignIn v-if="!applicationData" @sign-in-submit="callApi"/>
  </div>
</template>

<script>
import Application from './Application'
import SignIn from './components/small/SignIn'

export default {
  components: {
    Application,
    SignIn
  },

  data () {
    return {
      applicationData: null,
      warning: null
    }
  },

  methods: {
    callApi (data) {
      console.log('afdgdafs')
      const { companyName, passkey } = data
      const dev_root = "http://localhost:3000"
      const prod_root = "https://job-application-api.herokuapp.com"
      const url = `${dev_root}/applications/${companyName}?key=${passkey}`
      const ringRing = async (url) => {
        const response = await fetch(url)
        const apiData = await response.json()
        if (apiData.failure) {
          this.warning = apiData.failure
        } else {
          apiData.navTabs.forEach(nav => {
            nav.id === 'cover' ? nav.current = true : nav.current = false
          })
          this.applicationData = apiData
        }
      }
      ringRing(url)
    }
  }
}
</script>

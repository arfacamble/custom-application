<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <WarningError
      v-if="warning"
      :message="warning"
    />
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
      :competencies="applicationData.competencies"
    />
    <SignIn v-if="!applicationData" @sign-in-submit="callApi"/>
    <div v-if="callingApi" class="w-4/6 md:w-2/4 lg:w-1/3 border-gray-400 border rounded-md p-4 my-4 flex flex-col items-center">
      <PulseLoader class="my-2" />
      <p class="text-lg text-center">Calling API</p>
      <p class="italic text-sm text-center">Backend hosted on heroku, waking dynos</p>
    </div>
  </div>
</template>

<script>
import Application from './Application'
import SignIn from './components/small/SignIn'
import WarningError from './components/small/WarningError'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    Application,
    WarningError,
    SignIn,
    PulseLoader
  },

  data () {
    return {
      applicationData: null,
      warning: null,
      callingApi: false
    }
  },

  methods: {
    callApi (data) {
      const { companyName, passkey } = data
      const dev_root = "http://localhost:3000"
      const prod_root = "https://job-application-api.herokuapp.com"
      const url = `${prod_root}/applications/${companyName}?key=${passkey}`
      const ringRing = async (url) => {
        this.callingApi = true
        const response = await fetch(url)
        const apiData = await response.json()
        if (apiData.failure) {
          this.warning = apiData.failure
        } else {
          this.warning = null
          // apiData.navTabs.forEach(nav => {
          //   nav.id === 'cover' ? nav.current = true : nav.current = false
          // })
          this.applicationData = apiData
        }
        this.callingApi = false
      }
      ringRing(url)
    }
  }
}
</script>

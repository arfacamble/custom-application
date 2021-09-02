<template>
  <div class="h-screen flex justify-center items-center">
    <Application v-if="applicationData" :applicationData="applicationData" />
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
      const { companyName, passkey } = data
      const dev_root = "http://localhost:3000"
      const prod_root = "https://job-application-api.herokuapp.com"
      fetch(`${dev_root}/applications/${companyName}?key=${passkey}`)
        .then((response) => {
          return response.json()
        })
        .then((apiData) => {
          if (apiData.failure) {
            this.warning = apiData.failure
          } else {
            this.applicationData = apiData
          }
        })
    }
  }
}
</script>

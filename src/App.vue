<template>
  <div class="h-screen flex justify-center items-center">
    <SignIn v-if="!applicationData" @sign-in-submit="callApi"/>
    <Application v-if="applicationData"/>
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
      applicationData: null
    }
  },

  methods: {
    callApi (data) {
      const { companyName, passkey } = data
      fetch(`https://job-application-api.herokuapp.com/applications/${companyName}?key=${passkey}`)
        .then(response => response.json())
        .then(apiData => console.log(apiData))
    }
  }
}
</script>

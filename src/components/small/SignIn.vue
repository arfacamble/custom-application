<template>
  <div class="w-5/6 md:w-2/3 lg:w-2/4 border-gray-400 border rounded-md flex flex-col items-center p-4">
    <p class="text-xl">Please give your details so that the styling and content of the application can be retrieved</p>
    <div class="w-full p-2">
      <label for="company" class="text-gray-500">Company:</label>
      <input type="text" name="company" class="p-2 border border-gray-200 rounded-md w-full" v-model="companyName">
    </div>
    <div class="w-full p-2">
      <label for="passkey" class="text-gray-500">Key:</label>
      <input type="text" name="passkey" class="p-2 border border-gray-200 rounded-md w-full" v-model="passkey">
    </div>
    <button
      @click="report"
      class="self-end rounded-md bg-indigo-500 hover:bg-indigo-700 text-white text-lg font-bold inline mx-2 py-1 px-4 cursor-pointer"
    >
    GO
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      companyName: null,
      passkey: null
    }
  },

  methods: {
    report () {
      this.$emit('sign-in-submit', { companyName: this.companyName, passkey: this.passkey })
    }
  }
}
</script>

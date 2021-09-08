<template>
  <div class="w-4/6 md:w-2/4 lg:w-2/5 border-gray-400 border rounded-md items-center p-4 mb-4">
    <p class="text-xl text-center font-bold">Try Again:</p>
    <p class="text-lg text-center">{{message}}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      required: true,
      type: String
    }
  }
}
</script>

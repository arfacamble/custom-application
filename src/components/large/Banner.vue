<template>
  <div class="h-1/5 md:h-1/4 bg-primary flex justify-center">
    <div class="h-full w-full sm:w-5/6 md:w-3/4 lg:w-3/5 flex justify-center relative">
      <div class="h-full f-grow flex flex-col px-4">
        <div class="h-full f-grow flex flex-col justify-evenly">
          <h1 class="mt-2 sm:mt-2 md:mt-4 text-xl md:text-3xl font-headers">Arthur Campbell's</h1>
          <p class="text-sm md:text-md font-body self-center">application for</p>
          <h2 class="text-xl md:text-3xl font-headers self-end text-right">{{jobTitle}}</h2>
        </div>
        <img :src="logoUrl" :alt="companyName" class="flex-grow-0 self-center max-h-12 md:max-h-16">
      </div>
      <img src="my_face.png" alt="Arthur's face" class="self-end h-2/3 md:h-5/6">
      <a href="https://github.com/arfacamble" target="blank" class="absolute top-4 right-2 sm:right-0 h-8 w-8">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" alt="github">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    logoUrl: { required: true, type: String },
    jobTitle: { required: true, type: String },
    companyName: { required: true, type: String },
  }
}
</script>

<template>
  <div :class="[hidden ? 'hidden' : '', 'my-2 border border-background border-opacity-20 rounded-md p-2']" style="transition: height 1s">
    <div class="flex">
      <img :src="imageUrl" :alt="`${institution} image`" class="h-20 w-20 rounded-md">
      <div class="flex-grow pl-2 flex flex-col justify-evenly">
        <h4 class="font-headers font-light text-background text-base sm:text-lg md:text-2xl">{{title}}</h4>
        <h4 class="font-headers font-bold text-background text-sm sm:text-base md:text-lg">{{institution}}</h4>
        <h4 class="font-headers italic text-background text-xs sm:text-sm md:text-base">{{date}}</h4>
      </div>
      <ExpandCollapseArrow
        v-if="collapsible"
        :enlarged="enlarged"
        @click="toggleMoreInfo"
      />
    </div>
    <p v-if="text" class="font-body text-background mt-2">{{text}}</p>
    <div v-if="enlarged">
      <ul class="list-disc pl-6">
        <li class="font-body text-background font-light text-sm" v-for="point in bulletpoints" :key="point.split(' ')[0]">{{point}}</li>
      </ul>
      <div v-for="quote in quotes" :key="quote.author" class="my-1 text-sm mx-2">
        <p class="font-body text-background italic">"{{quote.text}}"</p>
        <p class="font-body text-background font-bold text-right mr-6">{{quote.author}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ExpandCollapseArrow from './ExpandCollapseArrow'

export default {
  components: {
    ExpandCollapseArrow
  },

  props: {
    institution: { required: true, type: String },
    title: { type: String },
    imageUrl: { required: true, type: String },
    date: { required: true, type: String },
    text: { type: String },
    cardId: { required: true, type: String },
    quotes: { type: Array },
    bulletpoints: { required: true, type: Array },
    hidden: { type: Boolean },
    enlargedOnRender: { type: Boolean },
    collapsible: { type: Boolean }
  },

  data () {
    return {
      enlarged: this.enlargedOnRender,
      collapsedHeight: null,
      expandedHeight: null
    }
  },

  methods: {
    toggleMoreInfo () {
      this.enlarged ? this.collapse() : this.expand()
    },
    expand () {
      const cardDiv = document.getElementById(`${this.cardId}-card`)
      const cardDivHidden = document.getElementById(`${this.cardId}-card-hidden`)
      cardDivHidden.classList.toggle('hidden')
      const collapsedHeight = cardDiv.offsetHeight
      const expandedHeight = cardDivHidden.offsetHeight
      this.collapsedHeight = collapsedHeight
      this.expandedHeight = expandedHeight
      cardDivHidden.classList.toggle('hidden')
      const transitionProp = cardDiv.style.transition
      cardDiv.style.transition = ''
      requestAnimationFrame(() => {
        cardDiv.style.height = `${collapsedHeight}px`
        cardDiv.classList.add('overflow-hidden')
        cardDiv.style.transition = transitionProp
        requestAnimationFrame(() => {
          this.enlarged = !this.enlarged
          cardDiv.style.height = `${expandedHeight}px`
        })
      })
    },
    collapse () {
      const cardDiv = document.getElementById(`${this.cardId}-card`)
      cardDiv.style.height = `${this.collapsedHeight}px`
      const removeStuff = () => {
        cardDiv.removeEventListener('transitionend', removeStuff);
        this.enlarged = !this.enlarged
        cardDiv.style.height = null;
      }
      cardDiv.addEventListener('transitionend', removeStuff)
    }
  }
}
</script>

<style scoped>
.more-details-enter-active, .more-details-leave-active {
  transition: height 3s ease-in-out, opacity 3s ease-in-out;
}

.more-details-enter, .more-details-leave-to {
  height: auto;
  opacity: 0;
}

.more-details-enter-to, .more-details-leave {
  height: auto;
  opacity: 1;
}
</style>

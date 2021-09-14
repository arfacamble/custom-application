<template>
  <div class="h-screen w-full">
    <Banner :logoUrl="logoUrl" :jobTitle="jobTitle" :companyName="companyName" />
    <div class="flex bg-secondary h-4/5 md:h-3/4 justify-center">
      <div class="flex h-full items-center w-full sm:w-7/8 md:w-4/5 lg:w-3/4">
        <SideNav :tabs="navTabs" @select-tab="selectTab"/>
        <div class="flex-grow h-full p-2 sm:p-4 md:p-8">
          <div class="w-full h-full flex flex-col">
            <h2 class="text-xl font-headers underline ml-8 mb-2 text-background">{{contentTitle}}</h2>
            <div class="flex-grow overflow-scroll">
              <Cover v-if="navTabs.cover.current" :text="cover" />
              <Cards v-if="navTabs.experience.current" :cards="experienceCards" />
              <Cards v-if="navTabs.education.current" :cards="educationCards" />
              <div v-if="navTabs.hobbies.current">
                <HobbyCard v-for="hobby in hobbies" :key="hobby.id"
                  :imageUrl="hobby.imageUrl"
                  :title="hobby.title"
                  :bulletpoints="hobby.bulletpoints"
                />
              </div>
              <div v-if="navTabs.projects.current">
                <ProjectCard v-for="project in projects" :key="project.id"
                  :imageUrl="project.imageUrl"
                  :url="project.url"
                  :title="project.title"
                  :bulletpoints="project.bulletpoints"
                />
              </div>
              <div v-if="navTabs.values.current">
                <ResponseCard v-for="value in values"
                  :key="value.id"
                  :id="value.id"
                  :title="value.title"
                  :text="value.text"
                  :valueImgUrl="value.imgUrl"
                  :responseImgUrl="value.responseImgUrl"
                />
              </div>
              <div v-if="navTabs.competencies.current">
                <h3 class="font-body text-sm italic ml-4 text-background">The list below is not exhaustive, but references only those competencies relevant to the job description</h3>
                <ResponseCard v-for="competency in competencies"
                  :key="competency.id"
                  :id="competency.id"
                  :title="competency.title"
                  :text="competency.text"
                  :imgUrl="competency.imgUrl"
                  :responseImgUrl="competency.responseImgUrl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from './components/large/Banner'
import SideNav from './components/large/SideNav'
import Cover from './components/large/Cover'
import Cards from './components/large/Cards'
import HobbyCard from './components/small/HobbyCard'
import ProjectCard from './components/small/ProjectCard'
import ResponseCard from './components/small/ResponseCard'

export default {
  components: {
    Banner,
    SideNav,
    Cover,
    Cards,
    HobbyCard,
    ProjectCard,
    ResponseCard
  },

  props: {
    companyName: { required: true, type: String },
    primaryColor: { required: true, type: String },
    backgroundColor: { required: true, type: String },
    secondaryColor: { required: true, type: String },
    headersFont: { required: true, type: String },
    bodyFont: { required: true, type: String },
    fontLink: { required: true, type: String },
    jobTitle: { required: true, type: String },
    logoUrl: { required: true, type: String },
    cover: { required: true, type: Array },
    education: { required: true, type: Array },
    experience: { required: true, type: Array },
    hobbies: { required: true, type: Array },
    projects: { required: true, type: Array },
    values: { required: true, type: Array },
    competencies: { required: true, type: Array }
  },

  data () {
    return {
      navTabs: {
        "cover": {
          "id": "cover",
          "title": "Cover",
          "iconName": "feed",
          "current": true
        },
        "values": {
          "id": "values",
          "title": "Values",
          "iconName": "question_answer",
          "current": false
        },
        "experience": {
          "id": "experience",
          "title": "Experience",
          "iconName": "work_outline",
          "current": false
        },
        "projects": {
          "id": "projects",
          "title": "Projects",
          "iconName": "precision_manufacturing",
          "current": false
        },
        "competencies": {
          "id": "competencies",
          "title": "Competencies",
          "iconName": "code",
          "current": false
        },
        "education": {
          "id": "education",
          "title": "Education",
          "iconName": "history_edu",
          "current": false
        },
        "hobbies": {
          "id": "hobbies",
          "title": "Hobbies",
          "iconName": "fingerprint",
          "current": false
        },
      }
    }
  },

  beforeMount() {
    document.documentElement.style.setProperty('--primary-color', this.primaryColor)
    document.documentElement.style.setProperty('--secondary-color', this.secondaryColor)
    document.documentElement.style.setProperty('--background-color', this.backgroundColor)
    document.documentElement.style.setProperty('--headers-font', this.headersFont)
    document.documentElement.style.setProperty('--body-font', this.bodyFont)
    const head = document.querySelector('head')
    head.insertAdjacentHTML('beforeend', `<link href="${this.fontLink}" rel="stylesheet">`)
  },

  methods: {
    selectTab (tabSelected) {
      const tabNames = Object.keys(this.navTabs)
      tabNames.forEach(tab => {
        this.navTabs[tab].current = false
      })
      this.navTabs[tabSelected].current = true
    }
  },

  computed: {
    contentTitle () {
      return Object.values(this.navTabs).filter(tab => tab.current)[0].title
    },

    experienceCards () {
      const cards = []
      this.experience.forEach((exp) => {
        exp.collapsible = true
        exp.enlargedOnRender = false
        cards.push(exp)
      })
      return cards
    },

    educationCards () {
      const cards = []
      this.education.forEach((edu) => {
        edu.collapsible = false
        edu.enlargedOnRender = true
        cards.push(edu)
      })
      return cards
    }
  }
}
</script>

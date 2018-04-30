// components added to the manifest can be accessed in browser via /test/{componentName}

export default {
  ProjectHeader: {
    components: require('../components/ProjectHeader/ProjectHeader'),
    props: {
      name: 'test',
      backgroundColor: 'lightBlue',
    },
  },
  Card: {
    components: require('../components/Card/Card'),
    props: {
    },
  },
  SwimLane: {
    components: require('../components/SwimLane/SwimLane'),
    props: {
    },
  },
};


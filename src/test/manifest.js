// components added to the manifest can be accessed in browser via /test/{componentName}

export default {
  ProjectHeader: {
    components: require('../components/ProjectHeader/ProjectHeader'),
    props: {
      name: 'test',
      backgroundColor: 'lightBlue',
    },
  },
  IssueCard: {
    components: require('../components/IssueCard/IssueCard'),
    props: {
    },
  },
  SwimLane: {
    components: require('../components/SwimLane/SwimLane'),
    props: {
    },
  },
};


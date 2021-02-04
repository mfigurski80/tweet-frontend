<template>
  <div id="about">
    <h2>About this Project:</h2>
    <p>
      This is a platform for sentiment analysis and aggregation of data, of
      which this website is a visualization. The data you see here is an
      analysis of live tweets from twitter with the "Coronavirus" hashtag. All
      the retweets are being filtered so that only 'original content' tweets are
      analyzed. These are, if load permits, passed through a sentiment analysis
      platform which classifies them as negative or positive. This data is the
      gathered into hourly aggregate points which you can view through this
      website.
    </p>
    <h2>Motivation:</h2>
    <p>
      There exists a lot of data sources tracking coronavirus cases. I wanted to
      make a dashboard for a different and yet also significant metric: public
      perception of the coronavirus pandemic. This data source is meant to track
      the morale of english-speaking twitter as it engages the pandemic and the
      events surrounding it.
    </p>
    <p>
      The platform is, however, extensible. Public sentiment is a valuable thing
      to measure and save, both for research and business purposes.
    </p>
    <h2>Technology</h2>
    <p>
      This application was deployed on the kubernetes platform. There are two
      unique python services linked by grpc to engage the twitter data stream.
      Sentiment is currently analyzed by a naive bayes algorithm with 72% tested
      accuracy -- I'm currently working to replace the core microservice with
      one based on Google's BERT transformer. This should allow the analysis to
      be more contextual and accurate, but also slow down the analysis process,
      which will likely force me to scale out the microservice.
    </p>
    <p>
      The frontend functionality is enabled by a Golang graphql API and a Vue
      application exposed through an nginx k8 ingress.
    </p>
  </div>
</template>

<script>
export default {
  name: "AboutSection",
};
</script>

<style scoped>
#about {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0px 10px 30px 10px;
}
</style>
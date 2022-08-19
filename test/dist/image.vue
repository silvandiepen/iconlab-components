<template>
  <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216">
    <path
      d="M163,175H53c-6.62,0-12-5.38-12-12V53c0-6.62,5.38-12,12-12h110c6.62,0,12,5.38,12,12v110c0,6.62-5.38,12-12,12ZM53,49c-2.21,0-4,1.79-4,4v110c0,2.21,1.79,4,4,4h110c2.21,0,4-1.79,4-4V53c0-2.21-1.79-4-4-4H53Z"
      style="fill: #231f20"
    />
    <path
      d="M81,103c-12.13,0-22-9.87-22-22s9.87-22,22-22,22,9.87,22,22-9.87,22-22,22Zm0-36c-7.72,0-14,6.28-14,14s6.28,14,14,14,14-6.28,14-14-6.28-14-14-14Z"
      style="fill: #231f20"
    />
    <polygon
      points="84.2 173.4 77.8 168.6 134.57 92.91 173.83 132.17 168.17 137.83 135.43 105.09 84.2 173.4"
      style="fill: #231f20"
    />
  </svg>
</template>
<script lang="ts">
export default defineComponent({
  name: "Image",
});
</script>
<style scoped>
svg {
  fill: red;
}
svg * {
  transform-box: fill-box;
}

@keyframes sun {
  100%,
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-25deg);
  }
  75% {
    transform: rotate(60deg);
  }
}
svg:hover path:nth-child(2) {
  transform-origin: 100% 300%;
  animation: sun 10s linear infinite;
}

svg:hover path:nth-child(2),
svg:hover polygon {
  opacity: 0.5;
}
</style>

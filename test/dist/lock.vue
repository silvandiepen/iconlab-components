<template>
  <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216">
    <path
      d="M154,175H62c-6.62,0-12-5.38-12-12v-59h116v59c0,6.62-5.38,12-12,12ZM58,112v51c0,2.21,1.79,4,4,4h92c2.21,0,4-1.79,4-4v-51H58Z"
      style="fill: #231f20"
    />
    <path
      d="M148,81h-8c0-17.65-14.36-32-32-32s-32,14.35-32,32h-8c0-22.06,17.94-40,40-40s40,17.94,40,40Z"
      style="fill: #231f20"
    />
    <rect x="140" y="81" width="8" height="1" style="fill: #231f20" />
    <rect x="68" y="81" width="8" height="27" style="fill: #231f20" />
  </svg>
</template>
<script lang="ts">
export default defineComponent({
  name: "Lock",
});
</script>
<style scoped>
svg {
  fill: red;
}
svg * {
  transform-box: fill-box;
}

svg:hover path:nth-child(2),
svg:hover rect {
  opacity: 0.5;
}

/* svg rect:nth-child(3) {
  transform: scaleY(27);
  transform-origin: 0% 0%;
} */
svg:hover rect:nth-child(3) {
  animation: unlockLine 2s ease-in-out forwards;
}

@keyframes unlockLine {
  0% {
    transform: translateY(0%) scaleY(27);
  }
  25%,
  100% {
    transform: translateY(2700%) scaleY(0);
  }
}
@keyframes unlockBow {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(75%);
  }
  100% {
    transform: translateY(0);
  }
}
svg:hover path:nth-child(2) {
  animation: unlockBow 2s ease-in-out forwards;
}
@keyframes unlockLine2 {
  100%,
  0% {
    transform: scaleY(1);
  }
  25% {
    transform: scaleY(0);
  }
}
svg:hover rect:nth-child(4) {
  transform-origin: 100% 100%;
  animation: unlockLine2 2s ease-in-out forwards;
}
</style>

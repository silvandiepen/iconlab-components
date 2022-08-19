<template>
  <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216">
    <polygon
      points="108 175.35 41 146.64 41 99 49 99 49 141.36 108 166.65 167 141.36 167 99 175 99 175 146.64 108 175.35"
      style="fill: #231f20"
    />
    <polygon
      points="169.42 75.68 108 49.35 46.58 75.68 43.42 68.32 108 40.65 172.58 68.32 169.42 75.68"
      style="fill: #231f20"
    />
    <polygon
      points="108 103.35 43.42 75.68 46.58 68.32 108 94.65 169.42 68.32 172.58 75.68 108 103.35"
      style="fill: #231f20"
    />
    <rect x="104" y="99" width="8" height="72" style="fill: #231f20" />
    <path
      d="M90.91,121.74L19.99,91.35l24.09-24.09,70.92,30.39-24.09,24.09Zm-56.91-33.09l55.08,23.61,11.91-11.91-55.08-23.61-11.91,11.91Z"
      style="fill: #231f20"
    />
    <path
      d="M125.09,121.74l-24.09-24.09,70.92-30.39,24.09,24.09-70.92,30.39Zm-10.08-21.39l11.91,11.91,55.08-23.61-11.91-11.91-55.08,23.61Z"
      style="fill: #231f20"
    />
  </svg>
</template>
<script lang="ts">
export default defineComponent({
  name: "Box",
});
</script>
<style scoped>
svg {
  fill: red;
}
/* svg * {
  transform-box: fill-box;
} */

svg:hover {
  animation: squeeze 1s ease-in-out forwards;
}

@keyframes squeeze {
  0%,
  100% {
    transform: scale(1);
  }
  33% {
    transform: scale(1.5, 0.75);
  }
  66% {
    transform: scale(0.75, 1.5);
  }
}
</style>

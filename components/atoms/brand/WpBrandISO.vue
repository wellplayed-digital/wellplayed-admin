<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1370.08 3424.03"
    class="wp-brand-iso"
  >
    <defs>
      <linearGradient
        id="linear-gradient"
        x1="500.92"
        y1="756.92"
        x2="861.72"
        y2="548.61"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#5f32ce" />
        <stop offset="1" stop-color="#f42557" />
      </linearGradient>
      <linearGradient
        id="linear-gradient-2"
        x1="802.83"
        y1="922.95"
        x2="1262.34"
        y2="657.65"
        xlink:href="#linear-gradient"
      />
      <linearGradient
        id="linear-gradient-3"
        x1="-168.75"
        y1="717.76"
        x2="568.19"
        y2="292.28"
        xlink:href="#linear-gradient"
      />
      <linearGradient
        id="linear-gradient-4"
        x1="242.85"
        y1="1430.67"
        x2="1124.31"
        y2="921.76"
        xlink:href="#linear-gradient"
      />
      <linearGradient
        id="linear-gradient-5"
        x1="711.03"
        y1="963.24"
        x2="1050.43"
        y2="375.4"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#f42557" />
        <stop offset="1" stop-color="#ff507a" />
      </linearGradient>
      <linearGradient
        id="linear-gradient-6"
        x1="92.72"
        y1="3370.16"
        x2="667.69"
        y2="3038.2"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#bc1d52" />
        <stop offset="1" stop-color="#764df4" />
      </linearGradient>
      <linearGradient
        id="linear-gradient-7"
        x1="741.58"
        y1="2989.82"
        x2="1245.57"
        y2="2698.84"
        xlink:href="#linear-gradient-6"
      />
      <linearGradient
        id="linear-gradient-8"
        x1="-409.68"
        y1="2499.98"
        x2="812.58"
        y2="1794.31"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#bc1d52" />
        <stop offset="1" stop-color="#764df4" />
      </linearGradient>
      <linearGradient
        id="linear-gradient-9"
        x1="546.59"
        y1="2330.74"
        x2="1217.97"
        y2="1943.12"
        xlink:href="#linear-gradient-6"
      />
      <linearGradient
        id="linear-gradient-10"
        x1="702.14"
        y1="1605.92"
        x2="943"
        y2="1466.86"
        xlink:href="#linear-gradient-6"
      />
      <linearGradient
        id="linear-gradient-11"
        x1="332.61"
        y1="2948.84"
        x2="1159.09"
        y2="1517.34"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#764df4" />
        <stop offset="1" stop-color="#8271ff" />
      </linearGradient>
    </defs>
    <g id="Layer_3" data-name="Layer 3">
      <g>
        <g>
          <polygon points="619.36 452.72 525.02 798.67 758.6 848.56 757.62 368.3 619.36 452.72" style="fill: url(#linear-gradient);" />
          <polygon points="1123.85 417.79 980.22 499.79 865.02 1030.66 1124.76 1057.81 1123.85 417.79" style="fill: url(#linear-gradient-2);" />
          <polygon points="395.96 781.33 399.44 0 5.61 229.73 0 1010.04 395.96 781.33" style="fill: url(#linear-gradient-3);" />
          <polygon points="1363.51 1336.06 395.96 781.33 0 1010.04 962.73 1575.98 1363.51 1336.06" style="fill: url(#linear-gradient-4);" />
          <polygon points="399.44 0 395.96 781.33 1363.51 1336.06 1363.19 556.42 1123.85 417.79 1124.56 1055.41 1003.1 985.28 1003.83 510.45 757.62 368.3 758.29 843.95 640.93 776.19 639.84 138.79 399.44 0" style="fill: url(#linear-gradient-5);" />
        </g>
        <g>
          <polygon points="395.4 2985.1 756.95 3192.81 363.68 3424.03 3.44 3215.52 395.4 2985.1" style="fill: url(#linear-gradient-6);" />
          <polygon points="758.63 2698 882.54 2633.7 1367.67 2910.33 968.55 3139.48 757.47 3017.34 758.63 2698" style="fill: url(#linear-gradient-7);" />
          <polygon points="5.51 1314.2 399.46 1078.77 395.4 2985.1 3.44 3215.52 5.51 1314.2" style="fill: url(#linear-gradient-8);" />
          <polygon points="882.54 2633.7 882.54 2494.7 1001.93 2562.13 1003.65 1571.9 761.94 1709.48 758.63 2698 882.54 2633.7" style="fill: url(#linear-gradient-9);" />
          <polygon points="1003.65 1571.9 762.8 1430.84 761.94 1709.48 1003.65 1571.9" style="fill: url(#linear-gradient-10);" />
          <polygon points="399.46 1078.77 395.4 2985.1 756.95 3192.81 762.8 1430.84 1003.65 1571.9 1001.93 2562.13 882.54 2494.7 882.54 2633.7 1367.67 2910.33 1370.08 1643.13 399.46 1078.77" style="fill: url(#linear-gradient-11);" />
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, default: false }
})
</script>

<style lang="scss">
@keyframes flare {
  0%, 50%, 100% {opacity: 1}
  25% {opacity: 0.5}
}

.wp-brand-iso--loading {
  --duration: 1s;
  --delay: calc(var(--duration) / 10);
  path {
    animation: flare var(--duration) infinite;
  }
  path:nth-child(1) {
    animation-delay: calc(var(--delay) * 1);
  }
  path:nth-child(2) {
    animation-delay: calc(var(--delay) * 2);
  }
  path:nth-child(3) {
    animation-delay: calc(var(--delay) * 3);
  }
  path:nth-child(4) {
    animation-delay: calc(var(--delay) * 4);
  }
  path:nth-child(5) {
    animation-delay: calc(var(--delay) * 5);
  }
}
</style>

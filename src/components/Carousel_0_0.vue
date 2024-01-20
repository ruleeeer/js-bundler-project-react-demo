<template>
  <div :style="styles.carousel">
    <Slide v-for="(slide, index) in slides" :key="index" :content="`${slide?.content ?? '??'}:${index}" :style="getSlideStyle(index)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';

interface SlideData {
  content: string;
  backgroundColor: string;
}

interface SlideProps {
  content: string;
  style: Record<string, any>;
}

const Slide = defineComponent<SlideProps>({
  props: {
    content: {
      type: String,
      required: true
    },
    style: {
      type: Object as () => Record<string, any>,
      required: true
    }
  },
  setup(props) {
    return () => <div :style="props.style">{{ props.content }}</div>;
  }
});

export default defineComponent({
  components: {
    Slide
  },
  setup() {
    const activeIndex = ref<number>(0);
    const slides: SlideData[] = [
      { content: '#5C1B2F', backgroundColor: '#5C1B2F' },
      { content: '#6AAF3C', backgroundColor: '#6AAF3C' },
      { content: '#F4E41B', backgroundColor: '#F4E41B' }
    ];

    const styles = computed(() => ({
      carousel: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        overflow: 'hidden',
        position: 'relative'
      },
      slide: {
        width: '100%',
        position: 'absolute',
        transition: 'all 0.5s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        color: '#fff'
      }
    }));

    onMounted(() => {
      const interval = setInterval(() => {
        activeIndex.value = (activeIndex.value + 1) % slides.length;
      }, 2000);
      return () => clearInterval(interval);
    });

    const getSlideStyle = (index: number): Record<string, any> => {
      const offset = (index - activeIndex.value) * 100;
      return {
        ...styles.value.slide,
        transform: `translateX(${offset}%)`,
        backgroundColor: slides[index].backgroundColor
      };
    };

    return {
      styles,
      slides,
      getSlideStyle
    };
  }
});
</script>

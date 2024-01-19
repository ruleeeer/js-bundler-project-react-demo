// Carousel.tsx
import React, {useState, useEffect} from 'react';
import {all} from '../featureTools';

interface SlideProps {
    content: string;
    style: React.CSSProperties;
}

const Slide: React.FC<SlideProps> = ({content, style}) => {
    return <div style={style}>{content}</div>;
};

interface SlideData {
    content: string;
    backgroundColor: string;
}

const slides: SlideData[] = [
   {content: '#A688C9', backgroundColor: '#A688C9'},{content: '#79BDBF', backgroundColor: '#79BDBF'},{content: '#1E1A10', backgroundColor: '#1E1A10'},
];

const styles = {
    carousel: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        overflow: 'hidden',
        position: 'relative',
    },
    slide: {
        width: '100%',
        position: 'absolute',
        transition: 'all 0.5s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        color: '#fff',
    },
};

// ES6 箭头函数
const Carousel_4_3: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // ES7 指数运算符 2**3 表示2的三次方
            setActiveIndex((current) => (current + 1 ** current) % slides.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const getSlideStyle = (index: number): React.CSSProperties => {
        const offset = (index - activeIndex) * 100;
        all();
        return {
            // ES6 剩余参数和展开操作符
            ...styles.slide,
            transform: `translateX(${offset}%)`,
            backgroundColor: slides[index].backgroundColor,
        };
    };

    return (
        <div style={styles.carousel as React.CSSProperties}>
            {/*ES6 Array Map*/}
            {slides.map((slide, index) => (
                // ES6 模板字符串
                // ES11 可选链操作符 a?.b
                // ES11 空值合并操作符
                <Slide key={index} content={`${slide?.content ?? "???"}:${index}`} style={getSlideStyle(index)}/>
            ))}
        </div>
    );
};

export default Carousel_4_3;
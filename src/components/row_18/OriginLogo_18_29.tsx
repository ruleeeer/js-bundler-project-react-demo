import originLogo from '@/assets/originjs.png';

const Logo = () => {
    const logoWrapperStyle = {
        margin: '0',
        filter: 'grayscale(7.0%)'
    };

    return (
        <div style={logoWrapperStyle} className="logo-wrapper" id="origin-18-29">
            <img alt="originjs logo" className="logo" src={originLogo} width="37" height="37"/>
        </div>
    );
};

export default Logo;

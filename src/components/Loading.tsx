import './Loading.css';

interface LoadingProps {
    message?: string;
    size?: 'small' | 'medium' | 'large';
}

function Loading({ message = 'กำลังโหลด...', size = 'medium' }: LoadingProps) {
    return (
        <div className={`loading-container ${size}`}>
            <div className="pokeball-spinner">
                <div className="pokeball">
                    <div className="pokeball-top"></div>
                    <div className="pokeball-center"></div>
                    <div className="pokeball-bottom"></div>
                </div>
            </div>
            <p className="loading-message">{message}</p>
        </div>
    );
}

export default Loading;

import Image from 'next/image';

type ProfileImageProps = {
    src?: string | null;
    className?: string;
}

export default function ProfileImage({ src, className = "" }: ProfileImageProps) {
    return (
        <div className={`relative w-12 h-12 rounded-full overflow-hidden ${className}`}>
            {
                src == null ? null : (
                    <Image src={src} alt='Profile Image' fill quality={100}/>
                )
            }
        </div>
    )
}
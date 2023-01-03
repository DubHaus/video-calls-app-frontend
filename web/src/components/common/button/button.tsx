import Link from 'next/link';
import {ReactNode} from 'react';
import Icon from '../icon';
import {IconType} from '../icon/icon';

type Props = {
    children?: ReactNode;
    icon?: IconType;
    type?: 'primary' | 'secondary' | 'ghost';
    submit?: boolean;
    href?: string;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    size?: 'lg' | 'base' | 'sm' | 'xs';
};

const Button = ({
    children,
    icon,
    type,
    disabled = false,
    href,
    submit = false,
    onClick,
    className = '',
    size = 'base',
}: Props) => {
    const iconOnly = icon && !children;
    type = type || (iconOnly ? 'ghost' : 'primary');
    return (
        <button
            onClick={onClick}
            type={submit ? 'submit' : 'button'}
            className={`${
                iconOnly ? 'h-[100%] p-1' : 'min-w-[100px] px-4 h-10'
            } font-bold rounded ${type === 'primary' && 'bg-indigo-500'} ${
                type === 'primary'
                    ? 'text-white'
                    : type === 'ghost' && iconOnly
                    ? 'text-current'
                    : 'text-indigo-500'
            } ${
                type === 'secondary'
                    ? 'border-solid  border-2 border-indigo-500'
                    : ''
            } ${className}`}>
            {href ? (
                <Link href={href}>
                    {children}
                </Link>
            ) : (
                <>
                    {children}
                    {icon ? <Icon size={size} icon={icon} /> : null}
                </>
            )}
        </button>
    );
};

export default Button;

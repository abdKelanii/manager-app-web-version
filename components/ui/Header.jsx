'use client';

function Header({ title, subtitle, center, secondary }) {
    return(
        <div className={`w-[90%] md:w-auto
            ${center ? 'text-center' : 'text-start'}
            ${secondary ? 'mt-5' : 'md:m-10 mt-10'}`}>
            <div 
                className={`${ secondary ? 'text-xl mt-5 font-medium' : 'text-3xl font-bold'}`}>
                {title}
            </div>
            {subtitle && (
                <div className="font-light text-sm mt-2">{subtitle}</div>
            )}
        </div>
    )
}

export default Header;
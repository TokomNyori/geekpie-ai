import clsx from "clsx";
import Image from "next/image";

type Feature = {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    isWide: boolean;
};

type BentoGridProps = {
    data: Feature[];
};

const BentoGrid = ({ data }: BentoGridProps) => {
    return (
        <>
            {data.map((feature) => (
                <div
                    className={clsx(`glass-container row-span-3 grid grid-rows-subgrid gap-4 rounded-lg bg-gradient-to-b 
                        from-gray-900 to-gray-950 p-4`, feature.isWide && "md:col-span-2")}
                    key={feature.title}
                >
                    <h3 className="text-2xl">{feature.title}</h3>
                    <div className="max-w-md text-balance text-slate-300">
                        <p>{feature.description}</p>
                    </div>
                    <Image
                        src={feature.imageSrc}
                        alt={feature.title}
                        className="max-h-36 w-auto"
                        width={400}
                        height={400}
                    />
                </div>
            ))}
        </>
    );
};

export default BentoGrid;

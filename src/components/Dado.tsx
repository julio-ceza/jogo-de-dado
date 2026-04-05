import Image from 'next/image';

interface DadoProps {
  valor: number;
}

export default function Dado({ valor }: DadoProps) {
  return (
    <div className="w-20 h-20 border-2 border-gray-400 rounded animate-bounce">
      <Image
        src={`/dice/${valor}.svg`}
        alt={`Dado ${valor}`}
        width={80}
        height={80}
        className="w-full h-full"
      />
    </div>
  );
}

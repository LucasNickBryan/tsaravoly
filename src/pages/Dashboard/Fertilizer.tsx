import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import { generateDose } from "../../utils/Dosage";

interface IDose {
    dose_N: number;
    dose_P: number;
    dose_K: number;
}

export default function Fertilizer() {
    // V A R I A B L E S
    const [isLoading, setIsLoading] = useState(false);
    const cultures = [
        { id: 1, npk: "40-16-13", name: "Riz" },
        { id: 2, npk: "114-43-125", name: "Maïs" },
        { id: 3, npk: "50-20-40", name: "Manioc" },
        { id: 4, npk: "132-37-97", name: "Haricot" },
        { id: 5, npk: "105-15-42", name: "Arachide" },
        { id: 6, npk: "60-35-80", name: "Soja" },
        { id: 7, npk: "116-49-187", name: "Patate douce" },
        { id: 8, npk: "60-50-100", name: "Pomme de terre" },
        { id: 9, npk: "98-27-143", name: "Tomate" },
        // { id: 10, npk: "123-45-152", name: "Test" },
    ]
    const [soilN, setSoilN] = useState('');
    const [soilP, setSoilP] = useState('');
    const [soilK, setSoilK] = useState('');
    const [weight, setWeight] = useState('');
    const [culture, setCulture] = useState(cultures[0].npk);
    const [dose, setDose] = useState<IDose>()
    const [errors, setErrors] = useState<string[]>([]);


    // F U N C T I O N S
    const onSubmit = (e: any) => {
        e.preventDefault();

        // Validate inputs
        const newErrors: string[] = [];
        if (!soilN) {
            newErrors.push("N");
        }
        if (!soilP) {
            newErrors.push("P");
        }
        if (!soilK) {
            newErrors.push("K");
        }
        if (!weight) {
            newErrors.push("Weight");
        }

        setErrors(newErrors);
        if (newErrors.length > 0) {
            return;
        }

        setIsLoading(true);

        const npk = culture.split('-');
        const n_culture = npk[0];
        const p_culture = npk[1];
        const k_culture = npk[2];

        try {
            const doseResult: IDose = generateDose(parseInt(soilN), parseInt(soilP), parseInt(soilK), parseInt(n_culture), parseInt(p_culture), parseInt(k_culture), parseInt(weight));

            setTimeout(() => {
                setIsLoading(false);
                setDose(doseResult);
            }, 1000);
        }
        catch (error) {
            console.error("Error generating dose:", error);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }

    }

    return (
        <>
            <PageMeta
                title="Engrais"
                description="Dosage des engrais"
            />
            <div className="border border-gray-200 rounded-xl lg bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4 md:p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Dosage des engrais
                </h2>

                <form>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-300 mt-4">
                            Information du sol
                        </h4>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-12 mt-2">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4">
                                    <label htmlFor="soilN" className="block text-2xl font-medium text-gray-800 dark:text-gray-300">
                                        N
                                    </label>
                                    <input
                                        type="number"
                                        id="soilN"
                                        name="soilN"
                                        className="mt-1 block w-20 p-2 text-xl text-center border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        placeholder="ex:10"
                                        min={1}
                                        max={200}
                                        onChange={(e) => setSoilN(e.target.value)}
                                        value={soilN}
                                        required
                                    />
                                </div>
                                {
                                    errors.includes('N') &&
                                    <span className="text-sm text-red-500">Remplir le champ</span>
                                }
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-4">
                                    <label htmlFor="soilP" className="block text-2xl font-medium text-gray-800 dark:text-gray-300">
                                        P
                                    </label>
                                    <input
                                        type="number"
                                        id="soilP"
                                        name="soilP"
                                        className="mt-1 block w-20 p-2 text-xl text-center border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        placeholder="ex:11"
                                        min={1}
                                        max={200}
                                        onChange={(e) => setSoilP(e.target.value)}
                                        value={soilP}
                                        required
                                    />
                                </div>
                                {
                                    errors.includes('P') &&
                                    <span className="text-sm text-red-500">Remplir le champ</span>
                                }
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-4">
                                    <label htmlFor="soilK" className="block text-2xl font-medium text-gray-800 dark:text-gray-300">
                                        K
                                    </label>
                                    <input
                                        type="number"
                                        id="soilK"
                                        name="soilK"
                                        className="mt-1 block w-20 p-2 text-xl text-center border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        placeholder="ex:12"
                                        min={1}
                                        max={200}
                                        onChange={(e) => setSoilK(e.target.value)}
                                        value={soilK}
                                        required
                                    />
                                </div>
                                {
                                    errors.includes('K') &&
                                    <span className="text-sm text-red-500">Remplir le champ</span>
                                }
                            </div>
                        </div>

                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-300 mt-4">
                            Information de la commande
                        </h4>
                        <div className="flex flex-col items-start md:items-center gap-2 mt-2 md:flex-row md:gap-12">
                            <div className="mt-2">
                                <label htmlFor="soilK" className="block text-base font-medium text-gray-800 dark:text-gray-300">
                                    Type de culture
                                </label>

                                <select className="rounded-xl border border-gray-200 bg-white mt-2 w-36"
                                    onChange={(e) => setCulture(e.target.value)}
                                >
                                    {
                                        cultures.map((culture) => (
                                            <option key={culture.id} value={culture.npk}>
                                                {culture.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="mt-2">
                                <label htmlFor="weight" className="block text-base font-medium text-gray-800 dark:text-gray-300">
                                    Quantité commandée (kg)
                                </label>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        id="weight"
                                        name="weight"
                                        className="mt-1 block w-20 p-2 text-xl text-center border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        placeholder="ex:25"
                                        min={1}
                                        max={1000}
                                        onChange={(e) => setWeight(e.target.value)}
                                        value={weight}
                                        required
                                    />
                                    <span className="text-base text-gray-500 dark:text-gray-400">
                                        kg
                                    </span>
                                </div>
                                {
                                    errors.includes('Weight') &&
                                    <span className="text-sm text-red-500">Remplir le champ</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button type="submit"
                            onClick={onSubmit}
                            className="px-5 py-2.5 rounded-lg flex items-center justify-center text-white text-sm tracking-wider font-medium border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600">
                            Calculer le dosage
                            {
                                isLoading ?
                                    (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#fff" className="ml-2 inline animate-spin"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                                                data-original="#000000" />
                                        </svg>
                                    )
                                    : (

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} className="text-white" fill={"none"}>
                                            <path d="M16 2V18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18V2" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M8 8.55626C8.88889 7.40291 10.3106 8.23432 12 9.31817C14.2222 10.7439 15.5556 9.65003 16 8.6152" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M7 2H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11 18.002L11.0087 17.9996" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M13 14.002L13.0087 13.9996" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )
                            }
                        </button>
                    </div>
                </form>

            </div>

            {/* DISPLAY DOSE RESULT */}
            <div className="border border-gray-200 rounded-xl lg bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4 md:p-6 mt-8">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Dosage d'engrais recommandé
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mt-6">
                    <div className="bg-teal-200 min-w-52 h-32 md:h-40 rounded-xl p-4 flex flex-col items-center justify-center relative">
                        <span className="absolute w-10/12 p-1 bg-slate-900 text-white text-center text-2xl rounded-xl -top-3">N</span>
                        <h4 className="text-7xl font-semibold text-gray-800 dark:text-white">
                            {dose?.dose_N ? dose.dose_N : '_'}
                            <span className="text-base font-normal text-gray-500 dark:text-gray-300">
                                &nbsp;kg
                            </span>
                        </h4>
                    </div>

                    <div className="bg-teal-200 min-w-52 h-32 md:h-40 rounded-xl p-4 flex flex-col items-center justify-center relative">
                        <span className="absolute w-10/12 p-1 bg-slate-900 text-white text-center text-2xl rounded-xl -top-3">P</span>
                        <h4 className="text-7xl font-semibold text-gray-800 dark:text-white">
                            {dose?.dose_P ? dose.dose_P : '_'}
                            <span className="text-base font-normal text-gray-500 dark:text-gray-300">
                                &nbsp;kg
                            </span>
                        </h4>
                    </div>

                    <div className="bg-teal-200 min-w-52 h-32 md:h-40 rounded-xl p-4 flex flex-col items-center justify-center relative">
                        <span className="absolute w-10/12 p-1 bg-slate-900 text-white text-center text-2xl rounded-xl -top-3">K</span>
                        <h4 className="text-7xl font-semibold text-gray-800 dark:text-white">
                            {dose?.dose_K ? dose.dose_K : '_'}
                            <span className="text-base font-normal text-gray-500 dark:text-gray-300">
                                &nbsp;kg
                            </span>
                        </h4>
                    </div>
                </div>

            </div>
        </>
    );
}

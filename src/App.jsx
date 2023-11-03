import { useState } from "react";
import "./App.css";

function App() {
	const [recentSearches, setRecentSearches] = useState([]);
	const [search, setSearch] = useState("");
	const [showAddToList, setShowAddToList] = useState(false);

	const handleSearch = (e) => {
		if (e.target.value === "") setShowAddToList(false);

		setSearch(e.target.value.toUpperCase());

		if (recentSearches.length === 0) {
			setShowAddToList(true);
			return;
		}
		const found = recentSearches.filter((item) =>
			item.bol.toLowerCase().includes(e.target.value.toLowerCase())
		);

		if (found.length === 0) setShowAddToList(true);
	};

	const generateRandomString = (charLength = 5) => {
		const chars = "0123456789";
		let randomString = "";
		for (let i = 0; i < charLength; i++) {
			const randomIndex = Math.floor(Math.random() * chars.length);
			randomString += chars[randomIndex];
		}
		return "TA" + randomString;
	};

	const chooseRandom = (options = ["Lagos, Nigeria", "Abuja, Nigeria"]) => {
		const randomIndex = Math.floor(Math.random() * options.length);
		return options[randomIndex];
	};

	const addToList = () => {
		let currentLocation = chooseRandom(["Lagos, Nigeria", "Abuja, Nigeria"]);
		let origin =
			currentLocation === "Lagos, Nigeria"
				? "Abuja, Nigeria"
				: "Lagos, Nigeria";
		let shipmentId = generateRandomString(5);
		let containerSize = chooseRandom(["20ft", "40ft"]);

		let newItem = {
			bol: search,
			shipmentId,
			containerSize,
			containerType: "FCL",
			currentLocation,
			origin,
			destination: "Barcelona, Spain",
		};
		setRecentSearches([...recentSearches, newItem]);
		setShowAddToList(false);
		setSearch("");
	};

	return (
		<main className='container py-10'>
			<div className='flex gap-5 border-b border-gray-300'>
				<a href='/' className='pb-3 border-b-2 border-black'>
					Track shipment
				</a>
				<a href='/' className='pb-3'>
					Track with documents
				</a>
			</div>

			<div>
				<input
					placeholder='Enter Bill of lading no e.g MSC17392833'
					type='search'
					value={search}
					onChange={handleSearch}
					className='p-4 border-b bg-transparent border-gray-300 w-full outline-none'
				/>
			</div>

			<div className='mt-3'>
				{search.length > 0 && !showAddToList > 0 && (
					<h3 className='font-medium text-sm'>Recent Searches</h3>
				)}

				<div className='mt-5 space-y-5'>
					{search.length > 0 &&
						recentSearches.length > 0 &&
						recentSearches
							.filter((item) =>
								item.bol.toLowerCase().includes(search.toLowerCase())
							)
							.map((search) => {
								return (
									<div key={search.bol}>
										<div>
											{search.shipmentId} • FCL • {search.containerSize}{" "}
											Container • Current location: {search.currentLocation}.
										</div>
										<div className='flex items-center space-x-3 justify-between mt-3'>
											<div className='h-2 w-2 bg-green-600'></div>
											<div className='h-1 w-[33%] bg-green-600'></div>
											<div className='h-2 w-2 bg-green-600'></div>
											<div className='h-1 w-[33%] bg-green-600'></div>
											<div className='h-2 w-2 bg-green-600'></div>
											<div className='h-1 w-[33%] bg-gray-300'></div>
											<div className='h-2 w-2 bg-gray-600'></div>
										</div>
										<div className='flex items-center justify-between'>
											<div>
												<div className='text-sm mt-2'>{search.origin}</div>
												<div className='text-xs text-gray-400 mt-1'>
													ETD: Oct 25, 2022
												</div>
											</div>
											<div>
												<div className='text-sm mt-2'>{search.destination}</div>
												<div className='text-xs text-gray-400 mt-1'>
													ETD: Oct 25, 2022
												</div>
											</div>
										</div>
									</div>
								);
							})}
				</div>

				{showAddToList && (
					<button
						onClick={addToList}
						className='mt-4 flex items-center space-x-2'>
						<div className='p-3 h-5 w-5 flex justify-center items-center rounded-full bg-gray-200'>
							+
						</div>
						<div>Add &quot;{search}&quot; to tracking list</div>
					</button>
				)}
			</div>
		</main>
	);
}

export default App;

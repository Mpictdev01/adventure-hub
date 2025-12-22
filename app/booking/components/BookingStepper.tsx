"use client";

interface BookingStepperProps {
	currentStep: 1 | 2 | 3 | 4;
}

export default function BookingStepper({ currentStep }: BookingStepperProps) {
	const steps = [
		{ number: 1, label: "Date & Quantity" },
		{ number: 2, label: "Details" },
		{ number: 3, label: "Payment" },
		{ number: 4, label: "Complete" },
	];

	return (
		<div className="mb-8">
			<div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
				{steps.map((step, index) => (
					<div key={step.number} className="flex items-center gap-2">
						<div
							className={`flex items-center gap-2 ${
								currentStep === step.number
									? "text-primary font-semibold"
									: currentStep > step.number
									? "text-text-secondary"
									: "text-text-secondary/50"
							}`}>
							<span
								className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
									currentStep === step.number
										? "bg-primary text-background-dark"
										: currentStep > step.number
										? "bg-primary/20 text-primary"
										: "border border-border-dark text-text-secondary/50"
								}`}>
								{currentStep > step.number ? (
									<span className="material-symbols-outlined text-[16px]">
										check
									</span>
								) : (
									step.number
								)}
							</span>
							<span className="hidden sm:inline">{step.label}</span>
						</div>
						{index < steps.length - 1 && (
							<span className="material-symbols-outlined text-border-dark text-lg">
								chevron_right
							</span>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

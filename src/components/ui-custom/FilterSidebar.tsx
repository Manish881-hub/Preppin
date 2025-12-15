import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export interface FilterState {
    roles: string[];
    companies: string[];
    difficulty: string[];
    verdict: string[];
}

interface FilterSidebarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
    filters,
    onFilterChange,
    className,
}) => {
    const handleCheckboxChange = (
        category: keyof FilterState,
        value: string,
        checked: boolean | string
    ) => {
        const currentValues = filters[category];
        let newValues: string[];

        if (checked) {
            newValues = [...currentValues, value];
        } else {
            newValues = currentValues.filter((item) => item !== value);
        }

        onFilterChange({
            ...filters,
            [category]: newValues,
        });
    };

    const clearFilters = () => {
        onFilterChange({
            roles: [],
            companies: [],
            difficulty: [],
            verdict: [],
        });
    };

    const isFiltered =
        filters.roles.length > 0 ||
        filters.companies.length > 0 ||
        filters.difficulty.length > 0 ||
        filters.verdict.length > 0;

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                {isFiltered && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-primary hover:text-primary/80 h-auto p-0 font-medium"
                    >
                        Clear all
                    </Button>
                )}
            </div>

            <Accordion type="multiple" defaultValue={['role', 'company', 'difficulty']} className="w-full">
                <AccordionItem value="role">
                    <AccordionTrigger>Job Role</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 pt-1">
                            {['Software Engineer', 'Product Manager', 'Data Scientist', 'Designer', 'QA Engineer'].map(
                                (role) => (
                                    <div key={role} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`role-${role}`}
                                            checked={filters.roles.includes(role)}
                                            onCheckedChange={(checked) =>
                                                handleCheckboxChange('roles', role, checked)
                                            }
                                        />
                                        <Label
                                            htmlFor={`role-${role}`}
                                            className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {role}
                                        </Label>
                                    </div>
                                )
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="company">
                    <AccordionTrigger>Company</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 pt-1">
                            {['Google', 'Apple', 'Meta', 'Amazon', 'Microsoft', 'Netflix'].map(
                                (company) => (
                                    <div key={company} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`company-${company}`}
                                            checked={filters.companies.includes(company)}
                                            onCheckedChange={(checked) =>
                                                handleCheckboxChange('companies', company, checked)
                                            }
                                        />
                                        <Label
                                            htmlFor={`company-${company}`}
                                            className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {company}
                                        </Label>
                                    </div>
                                )
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="difficulty">
                    <AccordionTrigger>Difficulty</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 pt-1">
                            {['Easy', 'Medium', 'Hard'].map((diff) => (
                                <div key={diff} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`diff-${diff}`}
                                        checked={filters.difficulty.includes(diff)}
                                        onCheckedChange={(checked) =>
                                            handleCheckboxChange('difficulty', diff, checked)
                                        }
                                    />
                                    <Label
                                        htmlFor={`diff-${diff}`}
                                        className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {diff}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default FilterSidebar;

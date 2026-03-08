import type { Ability } from "./type";

// Derived types for UI display
export interface SkillItem {
    id: number;
    label: string;
}

export interface SkillSubgroup {
    id: number;
    subtitle: string;
    skills: SkillItem[];
}

export interface SkillCategory {
    id: number; // abilityCategory.id
    code: string;
    title: string; // abilityCategory.description
    subgroups: SkillSubgroup[];
}

/**
 * Transform flat API abilities list into a grouped structure:
 * AbilityCategory → AbilitySubgroup → Ability
 *
 * Groups are sorted by category id, then subgroup id.
 * Each page in the survey corresponds to one abilityCategory.id.
 */
export function buildSkillCategories(abilities: Ability[]): SkillCategory[] {
    const categoryMap = new Map<number, SkillCategory>();

    for (const ability of abilities) {
        const subgroup = ability.abilitySubgroup;
        const category = subgroup.abilityCategory;

        // Ensure category exists
        if (!categoryMap.has(category.id)) {
            categoryMap.set(category.id, {
                id: category.id,
                code: category.code,
                title: category.description,
                subgroups: [],
            });
        }

        const cat = categoryMap.get(category.id)!;

        // Ensure subgroup exists within category
        let sg = cat.subgroups.find((s) => s.id === subgroup.id);
        if (!sg) {
            sg = {
                id: subgroup.id,
                subtitle: subgroup.description,
                skills: [],
            };
            cat.subgroups.push(sg);
        }

        // Add skill to subgroup
        sg.skills.push({
            id: ability.id,
            label: ability.description,
        });
    }

    // Sort categories by id, subgroups by id, skills by id
    const categories = [...categoryMap.values()].sort((a, b) => a.id - b.id);
    for (const cat of categories) {
        cat.subgroups.sort((a, b) => a.id - b.id);
        for (const sg of cat.subgroups) {
            sg.skills.sort((a, b) => a.id - b.id);
        }
    }

    return categories;
}

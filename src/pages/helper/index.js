export const handleUpdateArray = (i, key, value, setter) => {
    setter((prev) => prev.map(function (input, index) {
        if (i === index) {
            return {
                ...input,
                [key]: value
            };
        }
        return input;
    }))
}

export const handleDeleteArray = (index, setter) => setter((prev) => prev.filter((_, i) => i !== index));

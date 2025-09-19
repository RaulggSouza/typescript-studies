export function validation_errors_to_list(errors) {
    const walk = (e, parent = '') => {
        const path = parent ? `${parent}.${e.property}` : e.property;
        const current = e.constraints
            ? Object.entries(e.constraints).map(([code, message]) => ({
                path,
                code,
                message,
            }))
            : [];
        const children = e.children?.length ? e.children.flatMap(c => walk(c, path)) : [];
        return [...current, ...children];
    };
    return errors.flatMap(err => walk(err));
}
//# sourceMappingURL=validation-errors-to-issues.js.map
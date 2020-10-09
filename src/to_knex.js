const _lodash = require('lodash');
const _util = require('util');

const _lodash2 = _interopRequireDefault(_lodash);
const keys = _lodash2.default.keys;

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

const indent = function indent(text) {
    let count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return text;
};

const compact = o => {
    return _lodash2.default.filter(_lodash2.default.compact(o), p => {
        if (p == null) {
            return false;
        }

        return p.toString().length;
    });
};

const fail = (type, node) => {
    throw new Error((0, _util.format)('Unhandled %s node: %s', type, JSON.stringify(node)));
};

const _slicedToArray = function () {
    function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"]) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }

    return function (arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
    };
}();

const operatorValidate = (node) => {
    if (node.split('=').length > 1) {

    }
}

const validateWhere = (node) => {
    let value = node;
    let conditions = [];
    conditions = node.split(/\bAND\b|\bOR\b/);

    conditions.forEach(element => {
        if (element.split('Where').length == 1 && element.split('where').length == 1 && element.split('on').length == 1 && element.split('On').length == 1)
            operatorValidate(element);
    })

    return node;
    return '`' + node.split(' ').join('`,`') + '`';
}

const validateFrom = (node) => {
    let checker = false;
    for (let k = 0; k < node.length; k++) {
        if (
            (node[k] === '.' && node[k + 1] === 'i' && node[k + 2] === 'n' && node[k + 3] === 'n' && node[k + 4] === 'e' && node[k + 5] === 'r' && node[k + 6] === 'J' && node[k + 7] === 'o' && node[k + 8] === 'i' && node[k + 9] === 'n') ||
            (node[k] === '.' && node[k + 1] === 'c' && node[k + 2] === 'r' && node[k + 3] === 'o' && node[k + 4] === 's' && node[k + 5] === 's' && node[k + 6] === 'J' && node[k + 7] === 'o' && node[k + 8] === 'i' && node[k + 9] === 'n') ||
            (node[k] === '.' && node[k + 1] === 'j' && node[k + 2] === 'o' && node[k + 3] === 'i' && node[k + 4] === 'n') ||
            (node[k] === '.' && node[k + 1] === 'l' && node[k + 2] === 'e' && node[k + 3] === 'f' && node[k + 4] === 't' && node[k + 5] === 'O' && node[k + 6] === 'u' && node[k + 7] === 't' && node[k + 8] === 'e' && node[k + 9] === 'r' && node[k + 10] === 'J' && node[k + 11] === 'o' && node[k + 12] === 'i' && node[k + 13] === 'n') ||
            (node[k] === '.' && node[k + 1] === 'f' && node[k + 2] === 'u' && node[k + 3] === 'l' && node[k + 4] === 'l' && node[k + 5] === 'O' && node[k + 6] === 'u' && node[k + 7] === 't' && node[k + 8] === 'e' && node[k + 9] === 'r' && node[k + 10] === 'J' && node[k + 11] === 'o' && node[k + 12] === 'i' && node[k + 13] === 'n') ||
            (node[k] === '.' && node[k + 1] === 'r' && node[k + 2] === 'i' && node[k + 3] === 'g' && node[k + 4] === 'h' && node[k + 5] === 't' && node[k + 6] === 'O' && node[k + 7] === 'u' && node[k + 8] === 't' && node[k + 9] === 'e' && node[k + 10] === 'r' && node[k + 11] === 'J' && node[k + 12] === 'o' && node[k + 13] === 'i' && node[k + 14] === 'n') ||
            (node[k] === '.' && node[k + 1] === 'j' && node[k + 2] === 'o' && node[k + 3] === 'i' && node[k + 4] === 'n' && node[k + 5] === 'R' && node[k + 6] === 'a' && node[k + 7] === 'w')
        ) {
            checker = true;
            const firstVar = node.slice(0, k)
            const secondVar = node.slice(k)
            node = '`' + firstVar.split(', ').join('`,`') + '`)' + secondVar;
            break;
        }
    }
    if (checker === false) {
        node = '`' + node.split(', ').join('`,`') + '`)';
    }
    return node;
}

const parens = string => {
    return string
    return '(' + string + ')';
};

class ToKnex {
    static deparse(query) {
        return new ToKnex(query).deparseQuery();
    }

    constructor(tree) {
        this.tree = tree;
    }

    deparseQuery() {
        return this.tree.map(node => this.deparse(node)).join(';\n\n');
    }

    deparseNodes(nodes, context) {
        return nodes.map(node => this.deparse(node, context));
    }

    deparse(item, context) {
        if (item == null) {
            return null;
        }

        if (_lodash2.default.isNumber(item)) {
            return item;
        }

        const type = keys(item)[0];
        const node = _lodash2.default.values(item)[0];

        if (this[type] == null) {
            throw new Error(type + ' is not implemented');
        }

        const result = this[type](node, context);
        // console.log('type: ', type)
        // console.log('node: ', node)
        // console.log("result", result);
        return result;
    }

    escape(literal) {
        return "'" + literal.replace(/'/g, "''") + "'";
    };

    list(nodes) {
        let separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ', ';

        if (!nodes) {
            return '';
        }

        return this.deparseNodes(nodes).join(separator);
    }

    quote(value) {
        if (value == null) {
            return null;
        }

        if (_lodash2.default.isArray(value)) {
            return value.map(o => this.quote(o));
        }

        return value;
    }

    ['A_Expr'](node, context) {
        const output = [];

        switch (node.kind) {
            case 0:
                // AEXPR_OP
                if (node.lexpr) {
                    output.push(parens(this.deparse(node.lexpr)));
                }
                /*
                                if (node.name.length > 1) {
                                    const schema = this.deparse(node.name[0]);
                                    const operator = this.deparse(node.name[1]);
                                    output.push(`OPERATOR(${schema}.${operator})`);
                                } else {*/
                output.push(this.deparse(node.name[0]));/*
                }*/

                if (node.rexpr) {
                    output.push(parens(this.deparse(node.rexpr)));
                }

                if (output.length === 2) {
                    return parens(output.join(''));
                }

                return parens(output.join(' '));

            case 1:
                // AEXPR_OP_ANY
                output.push(this.deparse(node.lexpr));
                output.push((0, _util.format)('ANY (%s)', this.deparse(node.rexpr)));
                return output.join(` ${this.deparse(node.name[0])} `);

            case 2:
                // AEXPR_OP_ALL
                output.push(this.deparse(node.lexpr));
                output.push((0, _util.format)('ALL (%s)', this.deparse(node.rexpr)));
                return output.join(` ${this.deparse(node.name[0])} `);

            case 3:
                // AEXPR_DISTINCT
                return (0, _util.format)('%s IS DISTINCT FROM %s', this.deparse(node.lexpr), this.deparse(node.rexpr));

            case 4:
                // AEXPR_NULLIF
                return (0, _util.format)('NULLIF(%s, %s)', this.deparse(node.lexpr), this.deparse(node.rexpr));

            case 5: {
                // AEXPR_OF
                const op = node.name[0].String.str === '=' ? 'IS OF' : 'IS NOT OF';
                return (0, _util.format)('%s %s (%s)', this.deparse(node.lexpr), op, this.list(node.rexpr));
            }

            case 6: {
                // AEXPR_IN
                const operator = node.name[0].String.str === '=' ? 'IN' : 'NOT IN';

                return (0, _util.format)('%s %s (%s)', this.deparse(node.lexpr), operator, this.list(node.rexpr));
            }

            case 7:
                // AEXPR_LIKE
                output.push(this.deparse(node.lexpr));

                if (node.name[0].String.str === '!~~') {
                    output.push((0, _util.format)('NOT LIKE (%s)', this.deparse(node.rexpr)));
                } else {
                    output.push((0, _util.format)('LIKE (%s)', this.deparse(node.rexpr)));
                }

                return output.join(' ');

            case 8:
                // AEXPR_ILIKE
                output.push(this.deparse(node.lexpr));

                if (node.name[0].String.str === '!~~*') {
                    output.push((0, _util.format)('NOT ILIKE (%s)', this.deparse(node.rexpr)));
                } else {
                    output.push((0, _util.format)('ILIKE (%s)', this.deparse(node.rexpr)));
                }

                return output.join(' ');

            case 9:
                // AEXPR_SIMILAR
                // SIMILAR TO emits a similar_escape FuncCall node with the first argument
                output.push(this.deparse(node.lexpr));

                if (this.deparse(node.rexpr.FuncCall.args[1].Null)) {
                    output.push((0, _util.format)('SIMILAR TO %s', this.deparse(node.rexpr.FuncCall.args[0])));
                } else {
                    output.push((0, _util.format)('SIMILAR TO %s ESCAPE %s', this.deparse(node.rexpr.FuncCall.args[0]), this.deparse(node.rexpr.FuncCall.args[1])));
                }

                return output.join(' ');

            case 10:
                // AEXPR_1 TODO(zhm) untested
                output.push(this.deparse(node.lexpr));
                output.push((0, _util.format)('BETWEEN %s and %s', this.deparse(node.rexpr[0]), this.deparse(node.rexpr[1])));
                return output.join(' ');

            case 11:
                // AEXPR_NOT_BETWEEN TODO(zhm) untested
                output.push(this.deparse(node.lexpr));
                output.push((0, _util.format)('NOT BETWEEN %s and %s', this.deparse(node.rexpr[0]), this.deparse(node.rexpr[1])));
                return output.join(' ');

            default:
                return fail('A_Expr', node);
        }
    }

    ['A_Star'](node, context) {
        return "*";
    }

    ['A_Const'](node, context) {
        if (node.val.String) {
            return this.escape(this.deparse(node.val, context));
        }

        return this.deparse(node.val, context);
    }

    ['Alias'](node, context) {
        const name = node.aliasname;

        const output = ['as'];

        if (node.colnames) {
            output.push(name + parens(this.list(node.colnames)));
        } else {
            output.push(this.quote(name));
        }

        return output.join(' ');
    }

    ['BoolExpr'](node) {
        switch (node.boolop) {
            case 0:
                return parens(this.list(node.args, ' AND '));
            case 1:
                return parens(this.list(node.args, ' OR '));
            case 2:
                return (0, _util.format)('NOT (%s)', this.deparse(node.args[0]));
            default:
                return fail('BoolExpr', node);
        }
    }

    ['ColumnRef'](node) {
        const fields = node.fields.map(field => {
            if (field.String) {
                return this.quote(this.deparse(field));
            }

            return this.deparse(field);
        });

        return fields.join('.');
    }

    ['ResTarget'](node, context) {
        if (context === 'select') {
            return compact([this.deparse(node.val), this.quote(node.name)]).join(' AS ');
        } /*else if (context === 'update') {
            return compact([node.name, this.deparse(node.val)]).join(' = ');
        } else if (!(node.val != null)) {
            return this.quote(node.name);
        }*/

        return fail('ResTarget', node);
    }

    ['RangeVar'](node, context) {
        const output = [];
        /*
                if (node.inhOpt === 0) {
                    output.push('ONLY');
                }

                if (node.relpersistence === 'u') {
                    output.push('UNLOGGED');
                }

                if (node.relpersistence === 't') {
                    output.push('TEMPORARY');
                }

                if (node.schemaname != null) {
                    output.push(this.quote(node.schemaname));
                    output.push('.');
                }*/

        output.push(this.quote(node.relname));

        if (node.alias) {
            output.push(this.deparse(node.alias));
        }

        return output.join(' ');
    }

    ['SelectStmt'](node, context) {
        const output = [];

        if (node.withClause) {
            output.push(this.deparse(node.withClause));
        }

        if (node.op === 0) {
            // VALUES select's don't get SELECT

            if (node.valuesLists == null) {
                output.push('.select(');
            }
        } else {
            output.push(parens(this.deparse(node.larg)));

            // const sets = ['NONE', 'UNION', 'INTERSECT', 'EXCEPT'];
            const sets = ['NONE', '.union', '.intersect', 'EXCEPT'];

            output.push(sets[node.op]);

            if (node.all) {
                // output.push('ALL');
                output.push('All');
            }
            output.push('([')

            output.push(parens(this.deparse(node.rarg)));
            output.push('])')
        }


        if (node.distinctClause) {
            if (node.distinctClause[0] != null) {
                output.push('DISTINCT ON');

                const clause = node.distinctClause.map(e => this.deparse(e, 'select')).join(',\n');

                output.push(`(${clause})`);
            } else {
                output.push('DISTINCT');
            }
        }

        if (node.targetList) {
            // output.push(indent(node.targetList.map(e => this.deparse(e, 'select')).join(', ')));
            let dis = '';
            for (let k = output.length - 1; k >= 0; k--)
                if (output[k] === '.select(') {
                    break;
                } else {
                    dis = output[k] + dis;
                    output.pop();
                }

            const ind = indent(node.targetList.map(e => this.deparse(e, 'select')));
            ind[0] = dis + (dis ? ' ' : '') + ind[0];
            output.push(selectWrapperKnex(ind))
            output.push(')');
        }
        /*
                if (node.intoClause) {
                    output.push('INTO');
                    output.push(indent(this.deparse(node.intoClause)));
                }*/

        if (node.fromClause) {
            output.push('.from(');
            const result = indent(node.fromClause.map(e => this.deparse(e, 'from')).join(', '));
            output.push(validateFrom(result));
        }

        if (node.whereClause) {
            const result = indent(this.deparse(node.whereClause));
            const validator = whereStarter(result)
            output.push(validator)
        }
        /*
                if (node.valuesLists) {
                    output.push('VALUES');

                    const lists = node.valuesLists.map(list => {
                        return `(${list.map(v => this.deparse(v)).join(', ')})`;
                    });

                    output.push(lists.join(', '));
                }
*/
        if (node.groupClause) {
            output.push('.groupByRaw(`');
            output.push(indent(node.groupClause.map(e => this.deparse(e, 'group')).join(',\n')));
            output.push('`)');
        }


        if (node.havingClause) {
            output.push(havingStarter(indent(this.deparse(node.havingClause))));
        }
        /*
                                if (node.windowClause) {
                                    output.push('WINDOW');

                                    const windows = [];

                                    for (let i = 0; i < node.windowClause.length; i++) {
                                        const w = node.windowClause[i];
                                        const window = [];

                                        if (w.WindowDef.name) {
                                            window.push(this.quote(w.WindowDef.name) + ' AS');
                                        }

                                        window.push(parens(this.deparse(w, 'window')));

                                        windows.push(window.join(' '));
                                    }

                                    output.push(windows.join(', '));
                                }
                */
        if (node.sortClause) {

            output.push('.orderByRaw(`');
            output.push(indent(node.sortClause.map(e => this.deparse(e, 'sort')).join(', ')));
            output.push('`)');
        }

        if (node.limitCount) {
            output.push('.limit(');
            output.push(indent(this.deparse(node.limitCount)));
            output.push(')')
        }

        if (node.limitOffset) {
            output.push('.offset(');
            output.push(indent(this.deparse(node.limitOffset)));
            output.push(')')
        }

        if (node.lockingClause) {
            node.lockingClause.forEach(item => {
                return output.push(this.deparse(item));
            });
        }

        if (!(output[0][0] === 'k' && output[0][1] === 'n' && output[0][2] === 'e' && output[0][3] === 'x'))
            output.unshift('knex')
        return output.join('');
    }

    ['WithClause'](node) {
        const output = ['knex.with'];

        if (node.recursive) {
            output.push('Recursive');
        }
        output.push('(')
        output.push(this.list(node.ctes));
        return output.join('');
    }

    ['CommonTableExpr'](node) {
        const output = [];

        output.push(`\`${node.ctename}\`, (knex) => {`);

        if (node.aliascolnames) {
            output.push((0, _util.format)('(%s)', this.quote(this.deparseNodes(node.aliascolnames))));
        }

        output.push((0, _util.format)('(%s)', this.deparse(node.ctequery)));
        output.push('})')
        return output.join(' ');
    }

    ['String'](node) {
        return node.str;
    }

    ['NullTest'](node) {
        const output = [this.deparse(node.arg)];

        if (node.nulltesttype === 0) {
            output.push('IS NULL');
        } else if (node.nulltesttype === 1) {
            output.push('IS NOT NULL');
        }

        return output.join(' ');
    }

    ['JoinExpr'](node, context) {
        const output = [];

        output.push(this.deparse(node.larg));

        if (node.isNatural) {
            output.push('NATURAL');
        }

        let join = null;

        switch (true) {
            case node.jointype === 0 && node.quals != null:
                join = '.innerJoin(';
                break;

            case node.jointype === 0 && !node.isNatural && !(node.quals != null) && !(node.usingClause != null):
                join = '.crossJoin(';
                break;

            case node.jointype === 0:
                join = '.join(';
                break;

            case node.jointype === 1:
                join = '.leftOuterJoin(';
                break;

            case node.jointype === 2:
                join = '.fullOuterJoin(';
                break;

            case node.jointype === 3:
                join = '.rightOuterJoin(';
                break;

            default:
                fail('JoinExpr', node);
                break;
        }

        output.push(join);

        if (node.rarg) {
            // wrap nested j    oin expressions in parens to make the following symmetric:
            // select * from int8_tbl x cross join (int4_tbl x cross join lateral (select x.f1) ss)
            if (node.rarg.JoinExpr != null && !(node.rarg.JoinExpr.alias != null)) {
                output.push("`");
                output.push(`(${this.deparse(node.rarg)})`);
                output.push("`, , function() { this");
            } else {
                output.push("`");
                output.push(this.deparse(node.rarg));
                output.push("`, function() { this");
            }
        }

        if (node.quals) {
            output.push(joinStarter(this.deparse(node.quals)));
        }

        if (node.usingClause) {
            const using = this.quote(this.deparseNodes(node.usingClause)).join(', ');

            output.push(`USING (${using})`);
        }

        output.push('})')
        const wrapped = node.rarg.JoinExpr != null || node.alias ? '(' + output.join('') + ')' : output.join('');

        if (node.alias) {
            return wrapped + ' ' + this.deparse(node.alias);
        }

        return wrapped;
    }

    ['LockingClause'](node) {
        const strengths = ['NONE', // LCS_NONE
            'FOR KEY SHARE', 'FOR SHARE', 'FOR NO KEY UPDATE', 'FOR UPDATE'];

        const output = [];

        output.push(strengths[node.strength]);

        if (node.lockedRels) {
            output.push('OF');
            output.push(this.list(node.lockedRels));
        }

        return output.join(' ');
    }

    ['FuncCall'](node, context) {
        const output = [];

        let params = [];

        if (node.args) {
            params = node.args.map(item => {
                return this.deparse(item);
            });
        }

        // COUNT(*)
        if (node.agg_star) {
            params.push('*');
        }

        const name = this.list(node.funcname, '.');

        const order = [];

        const withinGroup = node.agg_within_group;

        if (node.agg_order) {
            order.push('ORDER BY');
            order.push(this.list(node.agg_order, ', '));
        }

        const call = [];

        call.push(name + '(');

        if (node.agg_distinct) {
            call.push('DISTINCT ');
        }

        // prepend variadic before the last parameter
        // SELECT CONCAT('|', VARIADIC ARRAY['1','2','3'])
        if (node.func_variadic) {
            params[params.length - 1] = 'VARIADIC ' + params[params.length - 1];
        }

        call.push(params.join(', '));

        if (order.length && !withinGroup) {
            call.push(' ');
            call.push(order.join(' '));
        }

        call.push(')');

        output.push(compact(call).join(''));

        if (order.length && withinGroup) {
            output.push('WITHIN GROUP');
            output.push(parens(order.join(' ')));
        }

        if (node.agg_filter != null) {
            output.push((0, _util.format)('FILTER (WHERE %s)', this.deparse(node.agg_filter)));
        }

        if (node.over != null) {
            output.push((0, _util.format)('OVER %s', this.deparse(node.over)));
        }

        return output.join(' ');
    }

    ['CoalesceExpr'](node) {
        return (0, _util.format)('COALESCE(%s)', this.list(node.args));
    }

    ['CaseExpr'](node) {
        const output = ['CASE'];

        if (node.arg) {
            output.push(this.deparse(node.arg));
        }

        for (let i = 0; i < node.args.length; i++) {
            output.push(this.deparse(node.args[i]));
        }

        if (node.defresult) {
            output.push('ELSE');
            output.push(this.deparse(node.defresult));
        }

        output.push('END');

        return output.join(' ');
    }

    ['CaseWhen'](node) {
        const output = ['WHEN'];

        output.push(this.deparse(node.expr));
        output.push('THEN');
        output.push(this.deparse(node.result));

        return output.join(' ');
    }

    ['BooleanTest'](node) {
        const output = [];

        output.push(this.deparse(node.arg));

        const tests = ['IS TRUE', 'IS NOT TRUE', 'IS FALSE', 'IS NOT FALSE', 'IS UNKNOWN', 'IS NOT UNKNOWN'];

        output.push(tests[node.booltesttype]);

        return output.join(' ');
    }

    ['SubLink'](node) {
        switch (true) {
            case node.subLinkType === 0:
                return (0, _util.format)('EXISTS (%s)', this.deparse(node.subselect));
            case node.subLinkType === 1:
                return (0, _util.format)('%s %s ALL (%s)', this.deparse(node.testexpr), this.deparse(node.operName[0]), this.deparse(node.subselect));
            case node.subLinkType === 2 && !(node.operName != null):
                return (0, _util.format)('%s IN (%s)', this.deparse(node.testexpr), this.deparse(node.subselect));
            case node.subLinkType === 2:
                return (0, _util.format)('%s %s ANY (%s)', this.deparse(node.testexpr), this.deparse(node.operName[0]), this.deparse(node.subselect));
            case node.subLinkType === 3:
                return (0, _util.format)('%s %s (%s)', this.deparse(node.testexpr), this.deparse(node.operName[0]), this.deparse(node.subselect));
            case node.subLinkType === 4:
                return (0, _util.format)('(%s)', this.deparse(node.subselect));
            case node.subLinkType === 5:
                // TODO(zhm) what is this?
                return fail('SubLink', node);
            // MULTIEXPR_SUBLINK
            // format('(%s)', @deparse(node.subselect))
            case node.subLinkType === 6:
                return (0, _util.format)('ARRAY (%s)', this.deparse(node.subselect));
            default:
                return fail('SubLink', node);
        }
    }

    ['TypeCast'](node) {
        return this.deparse(node.arg) + '::' + this.deparse(node.typeName);
    }

    ['TypeName'](node) {
        if (_lodash2.default.last(node.names).String.str === 'interval') {
            return this.deparseInterval(node);
        }

        const output = [];

        if (node.setof) {
            output.push('SETOF');
        }

        let args = null;

        if (node.typmods != null) {
            args = node.typmods.map(item => {
                return this.deparse(item);
            });
        }

        const type = [];

        type.push(this.type(node.names, args && args.join(', ')));

        if (node.arrayBounds != null) {
            type.push('[]');
        }

        output.push(type.join(''));

        return output.join(' ');
    }

    ['Integer'](node, context) {
        if (node.ival < 0 && context !== 'simple') {
            return `(${node.ival})`;
        }

        return node.ival.toString();
    }

    ['SortBy'](node) {
        const output = [];

        output.push(this.deparse(node.node));

        if (node.sortby_dir === 1) {
            output.push('ASC');
        }

        if (node.sortby_dir === 2) {
            output.push('DESC');
        }

        if (node.sortby_dir === 3) {
            output.push(`USING ${this.deparseNodes(node.useOp)}`);
        }

        if (node.sortby_nulls === 1) {
            output.push('NULLS FIRST');
        }

        if (node.sortby_nulls === 2) {
            output.push('NULLS LAST');
        }

        return output.join(' ');
    }

    type(names, args) {
        var _names$map = names.map(name => this.deparse(name)),
            _names$map2 = _slicedToArray(_names$map, 2);

        const catalog = _names$map2[0],
            type = _names$map2[1];


        const mods = (name, size) => {
            if (size != null) {
                return name + '(' + size + ')';
            }

            return name;
        };

        // handle the special "char" (in quotes) type
        if (names[0].String.str === 'char') {
            names[0].String.str = '"char"';
        }

        if (catalog !== 'pg_catalog') {
            return mods(this.list(names, '.'), args);
        }

        const res = this.convertTypeName(type, args);

        return mods(res, args);
    }
}

const selectWrapperKnex = (node) => {
    const output = [];

    node.forEach(element => {
        if (element.indexOf("knex") !== -1) {
            const firstVar = element.split(' AS ');
            if (firstVar.length === 1) {
                output.push(element);
            } else {
                output.push(firstVar[0] + '.as(' + `\`${firstVar[1]}\`` + '), ');
            }
        } else {
            if (element.indexOf("(") === -1 && (element.split('.').length === 2 || element.split(' AS ').length === 2)) {
                output.push('`');
                output.push(element);
                output.push('`, ');
            } else {
                if ((element === '*' || element.split(' ').length === 1) && element.indexOf("(") === -1) {
                    output.push('`');
                    output.push(element);
                    output.push('`, ');
                } else {
                    output.push('knex.raw(`');
                    output.push(element);
                    output.push('`),');
                }
            }
        }
    })

    return output.join('');
}

const prefixAdded = (str, pr) => {
    for (let k = 0; k < str.length; k++) {
        if (
            (str[k] === 'W' || str[k] === 'w') &&
            str[k + 1] === 'h' &&
            str[k + 2] === 'e' &&
            str[k + 3] === 'r' &&
            str[k + 4] === 'e'
        ) {
            str = insertInto(str, k + 5, pr);
            break;
        }
    }
    return str;
}

const prefixAdder = (str, pr) => {
    for (let k = 0; k < str.length; k++) {
        if (
            (str[k] === 'O' || str[k] === 'o') &&
            str[k + 1] === 'n'
        ) {
            str = insertInto(str, k + 2, pr);
            break;
        }
    }
    return str;
}

const prefixAdderHaving = (str, pr) => {
    for (let k = 0; k < str.length; k++) {
        if (
            (str[k] === 'H' || str[k] === 'h') &&
            str[k + 1] === 'a' &&
            str[k + 2] === 'v' &&
            str[k + 3] === 'i' &&
            str[k + 4] === 'n' &&
            str[k + 5] === 'g'
        ) {
            str = insertInto(str, k + 6, pr);
            break;
        }
    }
    return str;
}


const insertInto = (str, index, value) => {
    return str.substr(0, index) + value + str.substr(index);
}

const selectWrapper = (node) => {
    const output = [];

    node.forEach(element => {
        if (element.indexOf("(") === -1 && element.split('.').length === 2) {
            output.push('`');
            output.push(element);
            output.push('`, ');
        } else {
            if (element === '*') {
                output.push('`');
                output.push(element);
                output.push('`, ');
            } else {
                output.push('knex.raw(`');
                output.push(element);
                output.push('`), ');
            }
        }
    })

    return output.join('');
}
const splitter = (node) => {
    let index = 0;
    let output = [];
    for (let k = 0; k < node.length; k++) {
        if (node[k] == ' ' && node[k + 1] == 'A' && node[k + 2] == 'N' && node[k + 3] == 'D' && node[k + 4] == ' ') {
            const result = node.slice(index, k);
            output.push(result);
            output.push(node.slice(k + 1, k + 4));
            index = k + 5;
        }

        if (node[k] == ' ' && node[k + 1] == 'O' && node[k + 2] == 'R' && node[k + 3] == ' ') {
            const result = node.slice(index, k);
            output.push(result);
            output.push(node.slice(k + 1, k + 3));
            index = k + 4;
        }
    }
    output.push(node.slice(index, node.length))

    return output;
}

conditionOperatorSplitter = (node, name) => {
    const output = [];

    const firstVar = node.split(name)[0];
    const secondVar = node.split(name)[1];

    if (firstVar[0] === `'`)
        output.push(`knex.raw('?', [${firstVar}]),`)
    else
        output.push(`"${firstVar}",`)

    output.push(`"${name.split(' ').join('')}",`)

    if (secondVar[0] === `'`)
        output.push(`knex.raw("?", [${secondVar}])`)
    else
        output.push(`"${secondVar}"`)

    output.push(')')
    return output.join('')
}

const conditionOperator = (node, name) => {
    let output = [];

    for (let i = 0; i < node.length; i++) {
        if (node[i] === '(') {
            break;
        }

        if (node[i] === ' ' && node[i + 1] === 'I' && node[i + 2] === 'L' && node[i + 3] === 'I' && node[i + 4] === 'K' && node[i + 5] === 'E' && node[i + 6] === ' ') {
            output.push(name)
            const result = conditionOperatorSplitter(node, ' ILIKE ');
            output.push(result);
            break;
        }
        if (node[i] === ' ' && node[i + 1] === 'L' && node[i + 2] === 'I' && node[i + 3] === 'K' && node[i + 4] === 'E' & node[i + 5] === ' ') {
            output.push(name)
            const result = conditionOperatorSplitter(node, ' LIKE ');
            output.push(result);
            break;
        }
        if (node[i] === ' ' && node[i + 1] === '<' && node[i + 2] === '=' && node[i + 3] === ' ') {
            output.push(name)
            const result = conditionOperatorSplitter(node, ' <= ');
            output.push(result);
            break;
        }
        if (node[i] === ' ' && node[i + 1] === '>' && node[i + 2] === '=' && node[i + 3] === ' ') {
            output.push(name)
            const result = conditionOperatorSplitter(node, ' >= ');
            output.push(result);
            break;
        }
        if (node[i] === ' ' && node[i + 1] === '<' && node[i + 2] === '>' && node[i + 3] === ' ') {
            output.push(name)
            const result = conditionOperatorSplitter(node, ' <> ');
            output.push(result);
            break;
        }
        if (node[i] === ' ' && node[i + 1] === '!' && node[i + 2] === '=' && node[i + 3] === ' ') {
            output.push(name)
            const result = conditionOperatorSplitter(node, ' != ');
            output.push(result);
            break;
        }
        if (node[i] === ' ' && node[i + 1] === '=' && node[i + 2] === ' ') {
            output.push(name)
            const result = conditionOperatorSplitter(node, ' = ');
            output.push(result);
            break;
        }
        if (node[i] === ' ' && node[i + 1] === '>' && node[i + 2] === ' ') {
            output.push(name)
            const result = conditionOperatorSplitter(node, ' > ');
            output.push(result);
            break;
        }
        if (node[i] === ' ' && node[i + 1] === '<' && node[i + 2] === ' ') {
            output.push(name)
            const result = conditionOperatorSplitter(node, ' < ');
            output.push(result);
            break;
        }

        /*
                if (
                    (node[i] === ' ' && node[i + 1] === 'I' && node[i + 2] === 'L' && node[i + 3] === 'I' && node[i + 4] === 'K' && node[i + 5] === 'E' && node[i + 6] === ' ') ||
                    (node[i] === ' ' && node[i + 1] === 'L' && node[i + 2] === 'I' && node[i + 3] === 'K' && node[i + 4] === 'E' & node[i + 5] === ' ') ||
                    (node[i] === ' ' && node[i + 1] === '<' && node[i + 2] === '=' && node[i + 3] === ' ') ||
                    (node[i] === ' ' && node[i + 1] === '>' && node[i + 2] === '=' && node[i + 3] === ' ') ||
                    (node[i] === ' ' && node[i + 1] === '<' && node[i + 2] === '>' && node[i + 3] === ' ') ||
                    (node[i] === ' ' && node[i + 1] === '!' && node[i + 2] === '=' && node[i + 3] === ' ') ||
                    (node[i] === ' ' && node[i + 1] === '=' && node[i + 2] === ' ') ||
                    (node[i] === ' ' && node[i + 1] === '>' && node[i + 2] === ' ') ||
                    (node[i] === ' ' && node[i + 1] === '<' && node[i + 2] === ' ')
                ) {
                    output.push(name);

                    const firstVar = node.split(' ')[0];
                    const operator = node.split(' ')[1];
                    const secondVar = node.split(' ')[2];
                    if (firstVar[0] === `'`)
                        output.push(`knex.raw('?', [${firstVar}]),`)
                    else
                        output.push(`"${firstVar}",`)

                    output.push(`"${operator}",`)

                    if (secondVar[0] === `'`)
                        output.push(`knex.raw("?", [${secondVar}])`)
                    else
                        output.push(`"${secondVar}"`)

                    output.push(')')

                    break;
                }*/
    }

    return output.join('')
};

const conditionNot = (node, name) => {

    let output = [];

    for (let i = 0; i < node.length; i++) {
        if (node[i] === '(') {
            break;
        }
        ;

        if (
            node[i] === 'N' &&
            node[i + 1] === 'O' &&
            node[i + 2] === 'T' &&
            node[i + 3] === ' ' &&
            node[i + 4] === '('
        ) {

            let co = conditionOperator(node.split('NOT (')[1].split(')')[0], name);

            output.push(co);
            break;
        }

    }

    return output.join('')
};

const conditionIn = (node, name) => {
    let output = [];

    for (let i = 0; i < node.length; i++) {
        if (
            node[i] === ' ' &&
            node[i + 1] === 'I' &&
            node[i + 2] === 'N' &&
            node[i + 3] === ' '
        ) {
            output.push(name);

            node.split('(')[1].split(')')[0]

            const firstVar = node.split(' IN ')[0];
            const secondVar = node.split(' IN ')[1];

            if (firstVar[0] === `'`)
                output.push(`knex.raw('?', [${firstVar}]),`)
            else
                output.push(`"${firstVar}",`)


            /* if (secondVar[1] === `.`)
                output.push(secondVar)
            else
                output.push(secondVar.replace('(', '[').replace(')', ']'))*/
            output.push('[')
            output.push(secondVar)
            output.push(']')

            output.push(')')
            break;
        }
    }

    return output.join('')
};

const conditionNotIn = (node, name) => {
    let output = [];

    for (let i = 0; i < node.length; i++) {
        if (
            node[i] === ' ' &&
            node[i + 1] === 'N' &&
            node[i + 2] === 'O' &&
            node[i + 3] === 'T' &&
            node[i + 4] === ' ' &&
            node[i + 5] === 'I' &&
            node[i + 6] === 'N' &&
            node[i + 7] === ' '
        ) {

            output.push(name);

            node.split('(')[1].split(')')[0]

            const firstVar = node.split(' NOT IN ')[0];
            const secondVar = node.split(' NOT IN ')[1];

            if (firstVar[0] === `'`)
                output.push(`knex.raw('?', [${firstVar}]),`)
            else
                output.push(`"${firstVar}",`)


            if (secondVar[1] === `.`)
                output.push(secondVar)
            else
                output.push(secondVar.replace('(', '[').replace(')', ']'))

            output.push(')')
            break;
        }
    }

    return output.join('')
}

const conditionExists = (node, name) => {
    let output = [];

    for (let i = 0; i < node.length; i++) {
        if (
            node[i] === 'E' &&
            node[i + 1] === 'X' &&
            node[i + 2] === 'I' &&
            node[i + 3] === 'S' &&
            node[i + 4] === 'T' &&
            node[i + 5] === 'S' &&
            node[i + 6] === ' '
        ) {
            output.push(name);
            node.split('(')[1].split(')')[0]

            const firstVar = node.split('EXISTS ')[1];
            output.push(firstVar)
            break;
        }
    }

    return output.join('')
}

const conditionNotExists = (node, name) => {
    let output = [];

    for (let i = 0; i < node.length; i++) {
        if (
            node[i] === 'N' &&
            node[i + 1] === 'O' &&
            node[i + 2] === 'T' &&
            node[i + 3] === ' ' &&
            node[i + 4] === '(' &&
            node[i + 5] === 'E' &&
            node[i + 6] === 'X' &&
            node[i + 7] === 'I' &&
            node[i + 8] === 'S' &&
            node[i + 9] === 'T' &&
            node[i + 10] === 'S' &&
            node[i + 11] === ' '
        ) {
            output.push(name);
            node.split('(')[1].split(')')[0]

            const firstVar = node.split('NOT (EXISTS ')[1];
            output.push(firstVar)
            break;
        }
    }

    return output.join('')
}

const conditionBetween = (node, name) => {
    let output = [];

    for (let i = 0; i < node.length; i++) {
        if (
            node[i] === ' ' &&
            node[i + 1] === 'B' &&
            node[i + 2] === 'E' &&
            node[i + 3] === 'T' &&
            node[i + 4] === 'W' &&
            node[i + 5] === 'E' &&
            node[i + 6] === 'E' &&
            node[i + 7] === 'N' &&
            node[i + 8] === ' '
        ) {
            output.push(name);

            const firstVar = node.split(' BETWEEN ')[0];
            const secondVar = node.split(' BETWEEN ')[1];

            const thirdVar = secondVar.split(' and ')[0];
            const fourthVar = secondVar.split(' and ')[1];

            if (firstVar[0] === `'`)
                output.push(`knex.raw('?', [${firstVar}]),`)
            else
                output.push(`"${firstVar}",`)

            output.push(' [');
            output.push(thirdVar);
            output.push(', ');
            output.push(fourthVar);
            output.push('])');

            break;
        }
    }

    return output.join('')
}

const conditionNotBetween = (node, name) => {
    let output = [];

    for (let i = 0; i < node.length; i++) {
        if (
            node[i] === ' ' &&
            node[i + 1] === 'N' &&
            node[i + 2] === 'O' &&
            node[i + 3] === 'T' &&
            node[i + 4] === ' ' &&
            node[i + 5] === 'B' &&
            node[i + 6] === 'E' &&
            node[i + 7] === 'T' &&
            node[i + 8] === 'W' &&
            node[i + 9] === 'E' &&
            node[i + 10] === 'E' &&
            node[i + 11] === 'N' &&
            node[i + 12] === ' '
        ) {
            output.push(name);

            const firstVar = node.split(' NOT BETWEEN ')[0];
            const secondVar = node.split(' NOT BETWEEN ')[1];

            const thirdVar = secondVar.split(' and ')[0];
            const fourthVar = secondVar.split(' and ')[1];

            if (firstVar[0] === `'`)
                output.push(`knex.raw('?', [${firstVar}]),`)
            else
                output.push(`"${firstVar}",`)

            output.push(' [');
            output.push(thirdVar);
            output.push(', ');
            output.push(fourthVar);
            output.push('])');

            break;
        }
    }

    return output.join('')
}

const conditionRaw = (node, name) => {
    let output = [];

    output.push(name);
    output.push('"')
    output.push(node);
    output.push('")')

    return output.join('')
}

function whereStarter(node) {
    let splittedCondition =
        splitter(node);

    const output = []

    for (let k = 0; k < splittedCondition.length; k++) {
        if (splittedCondition[k] !== 'AND' && splittedCondition[k] !== 'OR') {
            let wh = '.where(';
            if (splittedCondition[k - 1] === 'AND')
                wh = '.andWhere(';
            if (splittedCondition[k - 1] === 'OR')
                wh = '.orWhere(';

            const co = conditionOperator(splittedCondition[k], wh);
            let cn = conditionNot(splittedCondition[k], wh);
            let cni = conditionNotIn(splittedCondition[k], wh);
            let ci = conditionIn(splittedCondition[k], wh);
            let cne = conditionNotExists(splittedCondition[k], wh);
            let ce = conditionExists(splittedCondition[k], wh);
            let cnb = conditionNotBetween(splittedCondition[k], wh);
            let cb = conditionBetween(splittedCondition[k], wh);
            let cr = conditionRaw(splittedCondition[k], wh)

            if (co) {
                output.push(co);
            } else if (cn) {
                cn = prefixAdded(cn, 'Not');
                output.push(cn);
            } else if (cni) {
                cni = prefixAdded(cni, 'In');
                output.push(cni)
            } else if (ci) {
                ci = prefixAdded(ci, 'In')
                output.push(ci)
            } else if (cne) {
                cne = prefixAdded(cne, 'NotExists');
                output.push(cne);
            } else if (ce) {
                ce = prefixAdded(ce, 'Exists');
                output.push(ce)
            } else if (cnb) {
                cnb = prefixAdded(cnb, 'NotBetween');
                output.push(cnb)
            } else if (cb) {
                cb = prefixAdded(cb, 'Between');
                output.push(cb)
            } else {
                cr = prefixAdded(cr, 'Raw');
                output.push(cr)
            }
        }
    }

    return output.join('');
}

function joinStarter(node) {
    let splittedCondition =
        splitter(node);

    const output = []

    for (let k = 0; k < splittedCondition.length; k++) {
        if (splittedCondition[k] !== 'AND' && splittedCondition[k] !== 'OR') {
            let wh = '.on(';
            if (splittedCondition[k - 1] === 'AND')
                wh = '.andOn(';
            if (splittedCondition[k - 1] === 'OR')
                wh = '.orOn(';

            const co = conditionOperator(splittedCondition[k], wh);
            let cn = conditionNot(splittedCondition[k], wh);
            let cni = conditionNotIn(splittedCondition[k], wh);
            let ci = conditionIn(splittedCondition[k], wh);
            let cne = conditionNotExists(splittedCondition[k], wh);
            let ce = conditionExists(splittedCondition[k], wh);
            let cnb = conditionNotBetween(splittedCondition[k], wh);
            let cb = conditionBetween(splittedCondition[k], wh);
            // let cr = conditionRaw(splittedCondition[k], wh)

            if (co) {
                output.push(co);
            } else if (cn) {
                cn = prefixAdder(cn, 'Not');
                output.push(cn);
            } else if (cni) {
                cni = prefixAdder(cni, 'In');
                output.push(cni)
            } else if (ci) {
                ci = prefixAdder(ci, 'In')
                output.push(ci)
            } else if (cne) {
                cne = prefixAdder(cne, 'NotExists');
                output.push(cne);
            } else if (ce) {
                ce = prefixAdder(ce, 'Exists');
                output.push(ce)
            } else if (cnb) {
                cnb = prefixAdder(cnb, 'NotBetween');
                output.push(cnb)
            } else if (cb) {
                cb = prefixAdder(cb, 'Between');
                output.push(cb)
            } else {
                // cr = prefixAdded(cr, 'Raw');
                // output.push(cr)
            }
        }
    }

    return output.join('');
}

function havingStarter(node) {
    let splittedCondition =
        splitter(node);

    const output = []

    for (let k = 0; k < splittedCondition.length; k++) {
        if (splittedCondition[k] !== 'AND' && splittedCondition[k] !== 'OR') {
            let wh = '.having(';
            if (splittedCondition[k - 1] === 'AND')
                wh = '.andHaving(';
            if (splittedCondition[k - 1] === 'OR')
                wh = '.orHaving(';

            const co = conditionOperator(splittedCondition[k], wh);
            let cn = conditionNot(splittedCondition[k], wh);
            let cni = conditionNotIn(splittedCondition[k], wh);
            let ci = conditionIn(splittedCondition[k], wh);
            let cne = conditionNotExists(splittedCondition[k], wh);
            let ce = conditionExists(splittedCondition[k], wh);
            let cnb = conditionNotBetween(splittedCondition[k], wh);
            let cb = conditionBetween(splittedCondition[k], wh);
            let cr = conditionRaw(splittedCondition[k], wh)

            if (co) {
                output.push(co);
            } else if (cn) {
                cn = prefixAdderHaving(cn, 'Not');
                output.push(cn);
            } else if (cni) {
                cni = prefixAdderHaving(cni, 'In');
                output.push(cni)
            } else if (ci) {
                ci = prefixAdderHaving(ci, 'In')
                output.push(ci)
            } else if (cne) {
                cne = prefixAdderHaving(cne, 'NotExists');
                output.push(cne);
            } else if (ce) {
                ce = prefixAdderHaving(ce, 'Exists');
                output.push(ce)
            } else if (cnb) {
                cnb = prefixAdderHaving(cnb, 'NotBetween');
                output.push(cnb)
            } else if (cb) {
                cb = prefixAdderHaving(cb, 'Between');
                output.push(cb)
            } else {
                cr = prefixAdderHaving(cr, 'Raw');
                output.push(cr)
            }
        }
    }

    return output.join('');
}


module.exports = ToKnex;

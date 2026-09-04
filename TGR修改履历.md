# TGR 禅道二次开发修改履历

本表记录相对禅道原版的定制修改。定制代码放在 `extension/custom/<模块>/ext/`，不直接改核心文件。每次改动请新增一行，不要覆盖历史记录。

填写约定：

- **序号**：按时间递增，格式 `TGR-YYYYMMDD-序号`
- **修改类型**：新增 / 修改 / 删除
- **涉及文件**：列出 `extension/custom/` 下的文件

---

| 序号 | 日期 | 修改人 | 模块/页面 | 修改类型 | 修改点 | 修改说明 | 涉及文件 | 提交 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TGR-20260820-01 | 2026-08-20 | qiangma-ops | Bug / 提交页、批量创建 | 删除 | 影响版本默认「主干」 | 提 Bug、批量创建时，「影响版本」不再预选、也不再展示系统默认选项「主干」，须选择真实版本；该字段仍为必填。编辑已有 Bug 不受影响。 | `extension/custom/bug/ext/zen/tgr.php`<br>`extension/custom/bug/ext/js/create/tgr.ui.js`<br>`extension/custom/bug/ext/js/batchcreate/tgr.ui.js` | 待提交 |
| TGR-20260820-02 | 2026-08-20 | qiangma-ops | Bug / 提交页重现步骤 | 修改 | 重现步骤默认模板 | 提交 Bug 时「重现步骤」默认模板由 `[步骤]`、`[结果]`、`[期望]` 改为：`[测试环境-Test Environment]`、`[机器SN-machine SN]`、`[测试步骤-Test Steps]`、`[测试结果-Test Result]`、`[预期结果-Expected Result]`、`[出现概率-Occurrence Probability]`、`[log路径-log path]`、`[备注-Remarks]`。从用例转 Bug 仍按原步骤/结果/期望填充。 | `extension/custom/bug/ext/lang/*/tgr.php`<br>`extension/custom/bug/ext/zen/tgr.php` | 待提交 |
| TGR-20260904-01 | 2026-09-04 | qiangma-ops | Bug / 提交页严重程度、优先级 | 修改 | 严重程度、优先级显示文案 | 严重程度 1/2/3/4 显示为「致命 / 严重 / 一般 / 提示」；优先级 1/2/3/4 显示为「紧急 / 高 / 中 / 低」。数据库仍存储数字 1–4。列表、编辑、筛选同步使用该文案。 | `extension/custom/bug/ext/lang/*/tgr.php` | 待提交 |

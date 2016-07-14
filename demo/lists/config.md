# 额外配置

如果编辑器有基于业务相关的配置,可以通过写相关的自定义业务组件,
嵌入到编辑器的配置选项中。

自定义组件的prop会传入一个`onChange`方法, 有2个参数:

```
    onChange: (key: string, value:any) => {}
```

点击编辑器的保存按钮之后, onSave方法传入的对象中的extendConfig字段
将会有通过onChange传入的值
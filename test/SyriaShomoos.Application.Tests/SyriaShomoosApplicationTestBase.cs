using Volo.Abp.Modularity;

namespace SyriaShomoos;

public abstract class SyriaShomoosApplicationTestBase<TStartupModule> : SyriaShomoosTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}

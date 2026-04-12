using SyriaShomoos.Samples;
using Xunit;

namespace SyriaShomoos.EntityFrameworkCore.Applications;

[Collection(SyriaShomoosTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<SyriaShomoosEntityFrameworkCoreTestModule>
{

}

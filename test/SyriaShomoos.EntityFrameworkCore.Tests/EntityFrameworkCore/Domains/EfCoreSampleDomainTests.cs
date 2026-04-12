using SyriaShomoos.Samples;
using Xunit;

namespace SyriaShomoos.EntityFrameworkCore.Domains;

[Collection(SyriaShomoosTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<SyriaShomoosEntityFrameworkCoreTestModule>
{

}
